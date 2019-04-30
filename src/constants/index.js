const constants = {
  trips: {
    types: {
      all: ["EXCLUSIVE", "GROUP_ONETIME", "GROUP_PERIODIC"],
      EXCLUSIVE: "EXCLUSIVE",
      GROUP_ONETIME: "GROUP_ONETIME",
      GROUP_PERIODIC: "GROUP_PERIODIC"
    },
    options: [{
      valueKey: "value",
      value: "EXCLUSIVE",
      label: "EXCLUSIVE"
    }, {
      valueKey: "value",
      value: "GROUP_ONETIME",
      label: "GROUP ONETIME"
    }, {
      valueKey: "value",
      value: "GROUP_PERIODIC",
      label: "GROUP PERIODIC"
    }]
  },
  users: {
    roles: {
      TOURIST: "TOURIST",
      COMPANY: "COMPANY",
      ADMIN: "ADMIN"
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
  },
  homeContent: {
    types: ['trip', 'journey', 'place'],
    PLACE: 'place',
    TRIP: 'trip',
    JOURNEY: 'journey'
  }
};

module.exports = constants;