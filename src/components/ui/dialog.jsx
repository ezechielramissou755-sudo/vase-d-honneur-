import * as React from "react";
import { X } from "lucide-react";

const DialogContext = React.createContext();

const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger = ({ asChild, children }) => {
  const context = React.useContext(DialogContext);
  
  if (asChild) {
    return React.cloneElement(children, {
      onClick: (e) => {
        children.props.onClick?.(e);
        context.onOpenChange(true);
      }
    });
  }
  
  return (
    <button onClick={() => context.onOpenChange(true)}>
      {children}
    </button>
  );
};

const DialogContent = ({ children, className = "" }) => {
  const context = React.useContext(DialogContext);
  
  if (!context.open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => context.onOpenChange(false)}
      />
      <div className={`relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mx-4 animate-in fade-in-0 zoom-in-95 ${className}`}>
        <button
          onClick={() => context.onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
};

const DialogHeader = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left mb-4 ${className}`}>
    {children}
  </div>
);

const DialogTitle = ({ className = "", children }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h2>
);

const DialogDescription = ({ className = "", children }) => (
  <p className={`text-sm text-slate-500 ${className}`}>
    {children}
  </p>
);

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription };
