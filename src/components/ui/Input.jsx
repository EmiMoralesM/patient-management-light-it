import { Icons } from '../Icons';

export const Input = ({ label, error, required, ...props }) => (
  <div className="input-group">
    <label className="input-label"> 
      {label} {required && <span className="required">*</span>}
    </label>
    <input
      {...props}
      className={`input-field ${error ? 'input-error' : ''}`}
    />
    {error && (
      <p className="error-message">
        <Icons.Alert />
        {error}
      </p>
    )}
  </div>
);


