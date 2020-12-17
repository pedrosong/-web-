import { Fragment } from "react";
import List from "./indexlist";
import ListNav from "./listnav";
import PageNav from "./pageNav";
function ListPage() {
  return <Fragment>
      <ListNav />
      <List />
      <PageNav />
  </Fragment>
}
export default ListPage;