import shortid from "shortid";

export const SIDEBAR_ITEM_INNERSECTION = "innersection"
export const SIDEBAR_ITEM_LAYOUT = "sidebarLayout"
export const SIDEBAR_ITEM = "sidebarItem";
export const SECTION = "section";
export const INNERSECTION = "innersection";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM_LAYOUT,
    component: {
      type: INNERSECTION,
      children: [],
      style: {},
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM_LAYOUT,
    component: {
      type: COLUMN,
      children: [],
      style: {},
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
