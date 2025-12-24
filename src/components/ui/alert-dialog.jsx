import * as React from "react";

const AlertDialogContext = React.createContext();

const AlertDialog = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

const AlertDialogTrigger = ({ asChild, children }) => {
  const context = React.useContext(AlertDialogContext);
  
  if (asChild) {
    return React.cloneElement(children, {
      onClick: (e) => {
        children.props.onClick?.(e);
        context.setOpen(true);
      }
    });
  }
  
  return (
    <button onClick={() => context.setOpen(true)}>
      {children}
    </button>
  );
};

const AlertDialogContent = ({ children, className = "" }) => {
  const context = React.useContext(AlertDialogContext);
  
  if (!context.open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => context.setOpen(false)}
      />
      <div className={`relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mx-4 animate-in fade-in-0 zoom-in-95 ${className}`}>
        {children}
      </div>
    </div>
  );
};

const AlertDialogHeader = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}>
    {children}
  </div>
);

const AlertDialogTitle = ({ className = "", children }) => (
  <h2 className={`text-lg font-semibold ${className}`}>
    {children}
  </h2>
);

const AlertDialogDescription = ({ className = "", children }) => (
  <p className={`text-sm text-slate-500 ${className}`}>
    {children}
  </p>
);

const AlertDialogFooter = ({ className = "", children }) => (
  <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4 ${className}`}>
    {children}
  </div>
);

const AlertDialogCancel = ({ className = "", children, ...props }) => {
  const context = React.useContext(AlertDialogContext);
  
  return (
    <button
      onClick={() => context.setOpen(false)}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-10 px-4 py-2 mt-2 sm:mt-0 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const AlertDialogAction = ({ className = "", children, onClick, ...props }) => {
  const context = React.useContext(AlertDialogContext);
  
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        context.setOpen(false);
      }}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-900 text-white hover:bg-blue-800 h-10 px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction 
};
