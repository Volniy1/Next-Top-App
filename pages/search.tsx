import { withLayout } from "../layout/Layout";
import { MenuItem } from "../interfaces/menu.interface";
import axios from "axios";
import { GetStaticProps } from "next";
import { API } from "../helpers/api";

function Search(): JSX.Element {
  return (
    <>
      <h1>Search gays</h1>
    </>
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu: menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
