import { withLayout } from "@/layout/Layout";
import axios from "axios";
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { MenuItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { ParsedUrlQuery } from "querystring";
import { API } from "../../helpers/api";

function Type({ firstCategory }: TypeProps): JSX.Element {
  return (
    <>
      <h1>type {firstCategory}</h1>
    </>
  );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => "/" + m.route),
    fallback: true,
  };
};
const type = firstLevelMenu.map((m) => m.icon);

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id,
  });
  return {
    props: {
      menu: menu,
      firstCategory: firstCategoryItem.id,
    },
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
