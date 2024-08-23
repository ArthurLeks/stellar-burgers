const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENT_ID = '643d69a5c3f7b9001cfa093e';
const BUN_ID = '643d69a5c3f7b9001cfa093d';
const SELECTOR_INGREDIENT = `[data-cy=${INGREDIENT_ID}]`;
const SELECTOR_INGREDIENT_IN_CONSTRUCTOR = '.constructor-element';
const SELECTOR_MODAL_OVERLAY = '[data-cy=overlay]';
const SELECTOR_MODAL = '#modals';
const SELECTOR_BUN = `[data-cy=${BUN_ID}]`;
const SELECTOR_ORDER_BUTTON = '[data-cy=order-button]';
const SELECTOR_NO_BUN = '[data-cy=no-bun]';
const SELECTOR_NO_INGREDIENTS = '[data-cy=no-ingredients]';
const ORDER_NUMBER = '50804';

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${BASE_URL}/auth/login`, {
    fixture: 'user.json'
  });
  cy.intercept('GET', `${BASE_URL}/auth/user`, {
    fixture: 'user.json'
  });
  cy.intercept('POST', `${BASE_URL}/orders`, {
    fixture: 'orders.json'
  });
  cy.visit('/');
});

describe('Тестирование конструктора бургера', () => {
  it('Добавление ингредиента из списка ингредиентов в конструктор', () => {
    cy.get(SELECTOR_INGREDIENT).children('button').click();
    cy.get(SELECTOR_INGREDIENT).find('.counter__num').contains('1');

    cy.get(SELECTOR_INGREDIENT_IN_CONSTRUCTOR)
      .find('.constructor-element__text')
      .contains('Филе Люминесцентного тетраодонтимформа');
  });

  describe('модальное окно с описанием ингредиента', () => {
    it('открытие модального окна с описанием ингредиента', () => {
      cy.get(SELECTOR_MODAL).should('be.empty');
      cy.get(SELECTOR_INGREDIENT).children('a').click();
      cy.get(SELECTOR_MODAL).should('be.not.empty');
      cy.url().should('include', INGREDIENT_ID);
      cy.get(SELECTOR_MODAL)
        .find('h3')
        .contains('Филе Люминесцентного тетраодонтимформа');
    });
    it('закрытие модального окна с описанием ингредиента по клику на крестик', () => {
      cy.get(SELECTOR_MODAL).should('be.empty');
      cy.get(SELECTOR_INGREDIENT).children('a').click();
      cy.get(SELECTOR_MODAL).should('be.not.empty');
      cy.get(SELECTOR_MODAL).find('button').click();
      cy.get(SELECTOR_MODAL).should('be.empty');
    });
    it('закрытие модального окна с описанием ингредиента по клику на оверлей', () => {
      cy.get(SELECTOR_MODAL).should('be.empty');
      cy.get(SELECTOR_INGREDIENT).children('a').click();
      cy.get(SELECTOR_MODAL).should('be.not.empty');
      cy.get(SELECTOR_MODAL_OVERLAY).click({ force: true });
      cy.get(SELECTOR_MODAL).should('be.empty');
    });
  });

  describe('Процесс создания заказа', () => {
    beforeEach(() => {
      window.localStorage.setItem('refreshToken', 'refreshTokenTest');
      cy.setCookie('accessToken', 'accessTokenTest');
    });
    afterEach(() => {
      window.localStorage.clear();
      cy.clearAllCookies();
    });

    it('Создание заказа', () => {
      cy.get(SELECTOR_NO_BUN).should('be.visible');
      cy.get(SELECTOR_NO_INGREDIENTS).should('be.visible');

      cy.get(SELECTOR_BUN).children('button').click();
      cy.get(SELECTOR_INGREDIENT).children('button').click();
      cy.get(SELECTOR_ORDER_BUTTON).click();
      cy.get(SELECTOR_MODAL).should('be.not.empty');
      cy.get(SELECTOR_MODAL).find('h2').contains(ORDER_NUMBER);
      cy.get(SELECTOR_MODAL).find('button').click();

      cy.get(SELECTOR_MODAL).should('be.empty');
      cy.get(SELECTOR_NO_BUN).should('be.visible');
      cy.get(SELECTOR_NO_INGREDIENTS).should('be.visible');
    });
  });
});
