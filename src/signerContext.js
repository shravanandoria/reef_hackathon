import { createContext, useState } from "react";

const SignerContext = createContext();

export const SignerProvider = ({ children }) => {
  const [signerState, setSignerState] = useState();

  return (
    <SignerContext.Provider value={{ signerState, setSignerState }}>
      {children}
    </SignerContext.Provider>
  );
};

export default SignerContext;
