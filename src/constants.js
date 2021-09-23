import shortid from "shortid";

export const SIDEBAR_ITEM = "sidebarItem";
export const SECTION = "section";
export const INNERSECTION = "innersection";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: SECTION,
    children: [],
    component: {
      type: SECTION,
      content: 'Some section'
    }
  },
  {
    id: shortid.generate(),
    type: INNERSECTION,
    children: [],
    component: {
      type: INNERSECTION,
      content: 'Some innersection'
    }
  },
  {
    id: shortid.generate(),
    type: COLUMN,
    children: [],
    component: {
      type: COLUMN,
      content: 'Some column'
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "text",
      content: "Some text",
      style: {
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Arial'
      }
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "input",
      content: "Some input"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "name",
      content: "Some name"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "email",
      content: "Some email"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "phone",
      content: "Some phone"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "image",
      content: "Some image"
    }
  }
];
