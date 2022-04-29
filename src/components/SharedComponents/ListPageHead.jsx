import { Link } from "react-router-dom";
import {
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    Button,
  } from "../Component";
const ListPageHead = ({sm, pageTitle, plusURL}) => {
    return(
        <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h3" page>
             {pageTitle}
            </BlockTitle>
            <BlockDes className="text-soft">
              <p>You have total 2,595 users.</p>
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent>
            <div className="toggle-wrap nk-block-tools-toggle">
              <Button
                className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                onClick={() => updateSm(!sm)}
              >
                <Icon name="menu-alt-r"></Icon>
              </Button>
              <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                <ul className="nk-block-tools g-3">
                  <li>
                    <a
                      href="#export"
                      onClick={(ev) => {
                        ev.preventDefault();
                      }}
                      className="btn btn-white btn-outline-light"
                    >
                      <Icon name="download-cloud"></Icon>
                      <span>Export</span>
                    </a>
                  </li>
                  <li className="nk-block-tools-opt">
                    <Link to={plusURL}>
                    <Button color="primary" className="btn-icon">
                      <Icon name="plus"></Icon>
                    </Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
    );
}


export default ListPageHead;