import React from "react";
import TimelineCard from "./TimelineCard";
import { PageLoader } from "../Loaders";
import InfiniteScroll from "react-infinite-scroller";

const Timeline = ({ items = [], loadMore }) => (
  !items.length ?
    <PageLoader/>
    :
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={true}
      className={"row pos-relative m-0"}
      loader={PageLoader()}
    >
      {
        items.map((item, index) => (
          <div className="col-md-6" key={index}>
            <div style={{width: "70%", float: index % 2 ? "left" : "right", marginBottom: "10px", borderRadius: "30"}}>
              <TimelineCard item={item.item} type={item.type}/>
            </div>
          </div>
        ))
      }
    </InfiniteScroll>
);

export default Timeline;