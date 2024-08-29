Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null), // По умолчанию возвращаем null
    setItem: jest.fn(() => null),
    removeItem: jest.fn(),
    clear: jest.fn()
  },
  writable: true // Позволяем изменять localStorage в тестах
});
