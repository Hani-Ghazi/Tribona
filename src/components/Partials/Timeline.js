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
      loader={PageLoader()}
    >
      {
        items.map((item, index) => (
          <div className="timeline" key={index}>
            <div className={`container ${index % 2 ? "right" : "left"}`}>
              <TimelineCard item={item.item} type={item.type}/>
            </div>
          </div>
        ))
      }
    </InfiniteScroll>
);

export default Timeline;