import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import cn from "classnames";
import { Header } from "./Header/Header";
import { SideBar } from "./SideBar/SideBar";
import { Footer } from "./Footer/Footer";
import { FunctionComponent, KeyboardEvent, useState, useRef } from "react";
import { AppContextProvider } from "@/context/app.context";
import { IAppContext } from "../context/app.context";
import { Up } from "@/components";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkdDisplayed, setIsSkipLinkDisplayed] =
    useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (
      key.code == "Space" ||
      key.code == "Enter" ||
      key.code == "NumpadEnter"
    ) {
      key.preventDefault();
      bodyRef.current?.focus();
      console.log(bodyRef.current?.firstChild);
    }
    setIsSkipLinkDisplayed(false);
  };
  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        tabIndex={1}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkdDisplayed,
        })}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <SideBar className={styles.sidebar} />
      <main role="main" className={styles.body} ref={bodyRef} tabIndex={0}>
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
