"use client";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// third-party
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// project-import
import Loader from "@/components/Loader";
import Locales from "@/components/Locales";
import Snackbar from "@/components/Snackbar";

import ThemeCustomization from "@/themes";
import { persister, store, dispatch } from "@/store";
import { ConfigProvider } from "@/contexts/ConfigContext";
import NavigationScroll from "@/layout/NavigationScroll";
import { FirebaseProvider as AuthProvider } from "@/contexts/FirebaseContext";
import AuthGuard from "@/utils/route-guard/AuthGuard";

export default function ProviderWrapper({ children }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) return <Loader />;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConfigProvider>
          <ThemeCustomization>
            <Locales>
              <NavigationScroll>
                <AuthProvider>
                  <AuthGuard>
                    <Snackbar />
                    {children}
                  </AuthGuard>
                </AuthProvider>
              </NavigationScroll>
            </Locales>
          </ThemeCustomization>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

ProviderWrapper.propTypes = {
  children: PropTypes.node,
};
