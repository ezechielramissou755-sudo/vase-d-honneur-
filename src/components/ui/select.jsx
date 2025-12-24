import * as React from "react";
import { ChevronDown } from "lucide-react";

const SelectContext = React.createContext();

const Select = ({ value, onValueChange, children }) => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ children, className = "" }) => {
  const context = React.useContext(SelectContext);
  
  return (
    <button
      type="button"
      onClick={() => context.setOpen(!context.open)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
};

const SelectValue = ({ placeholder }) => {
  const context = React.useContext(SelectContext);
  return <span>{context.value || placeholder}</span>;
};

const SelectContent = ({ children, className = "" }) => {
  const context = React.useContext(SelectContext);
  
  if (!context.open) return null;
  
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => context.setOpen(false)} />
      <div className={`absolute z-50 mt-1 min-w-[8rem] w-full overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md animate-in fade-in-0 zoom-in-95 ${className}`}>
        <div className="p-1">
          {children}
        </div>
      </div>
    </>
  );
};

const SelectItem = ({ value, children, className = "" }) => {
  const context = React.useContext(SelectContext);
  const isSelected = context.value === value;
  
  return (
    <div
      onClick={() => {
        context.onValueChange(value);
        context.setOpen(false);
      }}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 ${
        isSelected ? "bg-slate-100" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
