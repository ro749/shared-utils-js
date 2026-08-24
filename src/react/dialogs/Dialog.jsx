import React from 'react';

const Dialog = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {title && <div className="dialog-header">{title}</div>}
        <div className="dialog-body">{children}</div>
        <div className="dialog-footer">
          {actions && actions.length > 0 ? (
            <>
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={'dialog-button ' + (action.className || '')}
                >
                  {action.label}
                </button>
              ))}
            </>
          ):(
            <button onClick={onClose}>Cerrar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;