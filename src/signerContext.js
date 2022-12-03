import { createContext, useState } from "react";

const SignerContext = createContext();

export const SignerProvider = ({ children }) => {
  const [signerState, setSignerState] = useState();
  const [address, setAddress] = useState("");

  return (
    <SignerContext.Provider
      value={{ signerState, setSignerState, address, setAddress }}
    >
      {children}
    </SignerContext.Provider>
  );
};

export default SignerContext;
