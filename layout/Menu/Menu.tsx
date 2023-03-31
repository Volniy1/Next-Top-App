import styles from "./Menu.module.css";
import cn from "classnames";
import { KeyboardEvent, useContext, useState } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "../../helpers/helpers";
import { motion, useReducedMotion } from "framer-motion";

export const Menu = (): JSX.Element => {
  const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
    },
    hidden: {
      marginBottom: 0,
    },
  };
  const variantsChildren = {
    visible: {
      opacity: 1,
      marginBottom: 10,
      height: "fit-content",
    },
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      marginBottom: 0,
      height: 0,
    },
  };

  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory == secondCategory) {
            setAnnounce(m.isOpened ? "closed" : "opened");
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code == "Space" || key.code == "Enter") {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map((m) => (
          <li key={m.route} aria-expanded={m.id == firstCategory}>
            <Link href={`/${m.route}`}>
              <div
                className={cn(styles.firstlevel, {
                  [styles.firstlevelActive]: m.id == firstCategory,
                })}
              >
                {m.icon}
                <span>{m.name}</span>
              </div>
            </Link>
            {m.id == firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true;
          }

          return (
            <li key={m._id.secondCategory}>
              <button
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelKey(key, m._id.secondCategory)
                }
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                key={m._id.secondCategory}
                aria-expanded={m.isOpened}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((p) => (
      <motion.li key={p._id} variants={variantsChildren}>
        <Link
          legacyBehavior
          href={`/${route}/${p.alias}`}
          aria-current={
            `/${route}/${p.alias}` == router.asPath ? "page" : "false"
          }
        >
          <a
            tabIndex={isOpened ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${p.alias}` == router.asPath,
            })}
          >
            {p.category}
          </a>
        </Link>
      </motion.li>
    ));
  };

  return (
    <nav role="navigation" className={styles.menu}>
      {announce && (
        <span className="visualyHidden" role="log" aria-invalid>
          {announce == "opened" ? "развернуто" : "свернуто"}
        </span>
      )}
      <ul>{buildFirstLevel()}</ul>
    </nav>
  );
};

// {menu.map((m) => (
//   <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
// ))}
