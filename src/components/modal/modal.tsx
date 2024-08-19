import { FC, useEffect, useCallback, memo } from 'react';
import ReactDOM from 'react-dom';
import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalContainer = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalContainer as HTMLDivElement
  );
});
