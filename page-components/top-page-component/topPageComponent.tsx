import { TopPageComponentProps } from "./topPageComponent.props";
import { Htag } from "../../components/Htag/Htag";
import { Tag } from "@/components";
import styles from "./TopPageComponent.module.css";
import { HhData } from "../../components/HhData/HhData";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { Advantages } from "../../components/Advantages/Advantages";
import { Sort } from "../../components/Sort/Sort";
import { SortEnum } from "../../components/Sort/Sort.props";
import { useReducer, useEffect } from "react";
import { sortReducer } from "./sort.reducer";
import { Product } from "../../components/Product/Product";
import { useReducedMotion } from "framer-motion";
// import { useScrollY } from "../../hooks/useScrollY";
export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  );
  const shouldReduceMotion = useReducedMotion();
  // const y = useScrollY();

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: "reset", initialState: products });
  }, [products]);

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="gray" size="m" aria-label={products.length + "курсов"}>
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role="list">
        {sortedProducts &&
          sortedProducts.map((p) => (
            <Product
              role="listitem"
              layout={shouldReduceMotion ? false : true}
              product={p}
              key={p._id}
            />
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <div>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages}></Advantages>
        </div>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map((t) => (
        <Tag key={t} color="primary">
          {t}
        </Tag>
      ))}
    </div>
  );
};
