import React from "react";
import Tag from "../../components/common/Tag/Tag";
import Header from "../../components/layout/Header/Header";

export default function Search() {
  return (
    <>
      <Header buttonLeft='back' />
      <div>
        <Tag label='tag-default' color='default' />
        <Tag label='tag-primary' color='primary' />
        <Tag label='tag-secondary' color='black' />
        <Tag label='tag-white' color='white' />
      </div>
    </>
  );
}
