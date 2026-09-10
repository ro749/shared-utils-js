import React from 'react';
import IconamoonClose from '~icons/iconamoon/close';

const Dialog = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {actions && actions.length == 1 && (
          <div style={{display:'flex', justifyContent:'flex-end'}} >
            <button onClick={onClose}>
              <IconamoonClose />
            </button>
          </div>
        )}
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