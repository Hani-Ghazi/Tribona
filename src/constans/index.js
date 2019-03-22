const constants = {
  trips: {
    types: {
      GROUP: "GROUP",
      EXCLUSIVE: "EXCLUSIVE"
    }
  },
  users: {
    roles: {
      TOURIST: "TOURIST",
      COMPANY: "COMPANY"
    }
  },
  filters: {
    sort: {
      options: [{
        valueKey: "value",
        value: "updatedAt_DESC",
        label: "Latest"
      }, {
        valueKey: "value",
        value: "views_DESC",
        label: "Popularity"
      }],
      defaultOption: {
        valueKey: "updatedAt",
        value: "updatedAt",
        label: "Latest"
      }
    }
  }
};

module.exports = constants;