import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { register as registerService, login as loginService } from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'citizen' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await registerService({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      // Auto login after register
      const data = await loginService(formData.email, formData.password);
      login(data.access_token, data.user);
      
      if (data.user.role === 'citizen') {
        navigate('/citizen/dashboard');
      } else {
        navigate('/captain/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check the provided information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-10 border border-gray-200 rounded-lg shadow-subtle">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        </div>
        
        <ErrorMessage message={error} />

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input name="name" type="text" required className="input-field" value={formData.name} onChange={handleChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input name="email" type="email" required className="input-field" value={formData.email} onChange={handleChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select name="role" className="input-field bg-white" value={formData.role} onChange={handleChange}>
              <option value="citizen">Citizen</option>
              <option value="captain">Captain</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input name="password" type="password" required className="input-field" value={formData.password} onChange={handleChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input name="confirmPassword" type="password" required className="input-field" value={formData.confirmPassword} onChange={handleChange} />
          </div>

          <div>
            <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center items-center py-3 mt-4">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Register'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-black hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
