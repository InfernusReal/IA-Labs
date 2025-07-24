import React, { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add any service-related functions here
  const addService = (service) => {
    setServices(prev => [...prev, service]);
  };

  const removeService = (serviceId) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const updateService = (serviceId, updatedService) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId ? { ...service, ...updatedService } : service
      )
    );
  };

  const value = {
    services,
    setServices,
    loading,
    setLoading,
    error,
    setError,
    addService,
    removeService,
    updateService
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContext;
