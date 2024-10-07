import React, { useState, createContext, ReactNode, useContext } from "react";


interface ProductContextType {
  selectProduct: any[]; 
  setProduct: (details: any) => void; 
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [selectProduct, setSelectProduct] = useState<any[]>([]); 

  const setProduct = (details: any) => {
    setSelectProduct(details);
  };

  return (
    <ProductContext.Provider value={{ setProduct, selectProduct }}>
      {children}
    </ProductContext.Provider>
  );
};


export default function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
