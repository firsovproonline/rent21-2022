module.exports = (sequelize, Sequelize) => {
  const propertyType = require("../models/cian_PropertyType.model.js")(sequelize, Sequelize);

  const cianFields = {
    flatRent: {
      Category: 'flatRent',
      RoomType: ['both', 'combined', 'separate'],
      BedsCount: 0,
      FlatRoomsCount: [1,2,3,4,5,6,7,9],
      IsApartments: false,
      IsPenthouse: false,
      TotalArea: 0,
      FloorNumber: 0,
      AllRoomsArea: '',
      RoomDefinitions: '',
      Room: {
        Area: ''
      },
      LivingArea: 0,
      KitchenArea: 0,
      LoggiasCount: 0,
      BalconiesCount: 0,
      WindowsViewType: ['street' ,'yard' ,'yardAndStreet'],
      SeparateWcsCount: 0,
      CombinedWcsCount: 0,
      RepairType: ['cosmetic', 'design', 'euro', 'no'],
      HasInternet: false,
      HasFurniture: false,
      HasPhone: false,
      HasKitchenFurniture: false,
      HasTv: false,
      HasWasher: false,
      HasConditioner: false,
      HasRamp: false,
      HasBathtub: false,
      IsInHiddenBase: false,
      HasShower: false,
      HasDishwasher: false,
      PetsAllowed: false,
      HasFridge: false,
      ChildrenAllowed: false,
      Building: {
        Name: '',
        FloorsCount: 0,
        BuildYear: 0,
        MaterialType: [
          'aerocreteBlock',
          'block',
          'boards',
          'brick',
          'foamConcreteBlock',
          'gasSilicateBlock',
          'monolith',
          'monolithBrick',
          'old',
          'panel',
          'stalin',
          'wireframe',
          'wood'
        ],
        Series: '',
        CeilingHeight: 0,
        PassengerLiftsCount: 0,
        CargoLiftsCount: 0,
        HasGarbageChute: false,
        Parking: {
          Type: [
            'ground',
            'multilevel',
            'open',
            'roof',
            'underground'
          ]
        }
      },
      Apartment: '',
      BargainTerms: {
        Price: 0,
        UtilitiesTerms: {
          IncludedInPrice: false,
          Price: 0,
          FlowMetersNotIncludedInPrice: false
        },
        Currency: ['eur', 'rur', 'usd'],
        BargainAllowed: false,
        BargainPrice: 0,
        BargainConditions: '',
        LeaseTermType: ['fewMonths','longTerm'],
        PrepayMonths: 0,
        Deposit: 0,
        ClientFee: 0,
        AgentFee: 0,
        AgentBonus: {
          Value: 0,
          PaymentType: ['fixed', 'percent'],
          Currency: ['eur', 'rur', 'usd'],
        }
      }
    },
    bedRent: {
      Category: 'bedRent',
      RoomsForSaleCount: 0,
      RoomArea: 0,
      BedsCountL: 0,
      RoomsCount: 0,
      TotalArea: 0,
      FloorNumber: 0,
      KitchenArea: 0,
      LoggiasCount: 0,
      BalconiesCount: 0,
      SeparateWcsCount: 0,
      CombinedWcsCount: 0,
      RepairType: ['cosmetic', 'design', 'euro', 'no'],
      HasInternet: false,
      HasFurniture: false,
      HasPhone: false,
      HasKitchenFurniture: false,
      HasTv: false,
      HasWasher: false,
      HasConditioner: false,
      HasRamp: false,
      HasBathtub: false,
      IsInHiddenBase: false,
      HasShower: false,
      HasDishwasher: false,
      PetsAllowed: false,
      HasFridge: false,
      ChildrenAllowed: false,
      Building: {
        Name: '',
        FloorsCount: 0,
        BuildYear: 0,
        MaterialType: [
          'aerocreteBlock',
          'block',
          'boards',
          'brick',
          'foamConcreteBlock',
          'gasSilicateBlock',
          'monolith',
          'monolithBrick',
          'old',
          'panel',
          'stalin',
          'wireframe',
          'wood'
        ],
        Series: '',
        CeilingHeight: 0,
        PassengerLiftsCount: 0,
        CargoLiftsCount: 0,
        HasGarbageChute: false,
        Parking: {
          Type: [
            'ground',
            'multilevel',
            'open',
            'roof',
            'underground'
          ]
        }
      },
      BargainTerms: {
        Price: 0,
        UtilitiesTerms: {
          IncludedInPrice: false,
          Price: 0,
          FlowMetersNotIncludedInPrice: false
        },
        Currency: ['eur', 'rur', 'usd'],
        BargainAllowed: false,
        BargainPrice: 0,
        BargainConditions: '',
        LeaseTermType: ['fewMonths','longTerm'],
        PrepayMonths: 0,
        Deposit: 0,
        ClientFee: 0,
        AgentFee: 0,
        AgentBonus: {
          Value: 0,
          PaymentType: ['fixed', 'percent'],
          Currency: ['eur', 'rur', 'usd'],
        }
      }
    },
    roomRent: {
      Category: 'roomRent',
      RoomsForSaleCount: 0,
      RoomType: ['both', 'combined', 'separate'],
      RoomArea: 0,
      BedsCount: 0,
      RoomsCount: 0,
      FlatRoomsCount: [1,2,3,4,5,6,7,9],
      TotalArea: 0,
      FloorNumber: 0,
      KitchenArea: 0,
      LoggiasCount: 0,
      BalconiesCount: 0,
      SeparateWcsCount: 0,
      CombinedWcsCount: 0,
      RepairType: ['cosmetic', 'design', 'euro', 'no'],
      HasInternet: false,
      HasFurniture: false,
      HasPhone: false,
      HasKitchenFurniture: false,
      HasTv: false,
      HasWasher: false,
      HasConditioner: false,
      HasRamp: false,
      HasBathtub: false,
      IsInHiddenBase: false,
      HasShower: false,
      HasDishwasher: false,
      PetsAllowed: false,
      HasFridge: false,
      ChildrenAllowed: false,
      Building: {
        Name: '',
        FloorsCount: 0,
        BuildYear: 0,
        MaterialType: [
          'aerocreteBlock',
          'block',
          'boards',
          'brick',
          'foamConcreteBlock',
          'gasSilicateBlock',
          'monolith',
          'monolithBrick',
          'old',
          'panel',
          'stalin',
          'wireframe',
          'wood'
        ],
        Series: '',
        CeilingHeight: 0,
        PassengerLiftsCount: 0,
        CargoLiftsCount: 0,
        HasGarbageChute: false,
        Parking: {
          Type: [
            'ground',
            'multilevel',
            'open',
            'roof',
            'underground'
          ]
        }
      },
      BargainTerms: {
        Price: 0,
        UtilitiesTerms: {
          IncludedInPrice: false,
          Price: 0,
          FlowMetersNotIncludedInPrice: false
        },
        Currency: ['eur', 'rur', 'usd'],
        BargainAllowed: false,
        BargainPrice: 0,
        BargainConditions: '',
        LeaseTermType: ['fewMonths','longTerm'],
        PrepayMonths: 0,
        Deposit: 0,
        TenantsType: ['any', 'family', 'female', 'male'],
        ClientFee: 0,
        AgentFee: 0,
        AgentBonus: {
          Value: 0,
          PaymentType: ['fixed', 'percent'],
          Currency: ['eur', 'rur', 'usd'],
        }
      }

    },
    houseRent: {
      Category: 'houseRent',
      BedsCount: 0,
      BuildingCadastralNumber: '',
      SettlementName: '',
      TotalArea: 0,
      BedroomsCount: 0,
      WcLocationType: ['indoors', 'outdoors'],
      RepairType: ['cosmetic', 'design', 'euro', 'no'],
      HasInternet: false,
      HasFurniture: false,
      HasPhone: false,
      HasKitchenFurniture: false,
      HasTv: false,
      HasWasher: false,
      HasConditioner: false,
      HasBathtub: false,
      IsInHiddenBase: false,
      HasShower: false,
      HasBathhouse: false,
      HasGarage: false,
      HasPool: false,
      HasDishwasher: false,
      PetsAllowed: false,
      HasFridge:false,
      ChildrenAllowed:false,
      Building: {
        FloorsCount: 0,
        BuildYear: 0,
        MaterialType: [
          'aerocreteBlock',
          'boards',
          'brick',
          'foamConcreteBlock',
          'gasSilicateBlock',
          'monolith',
          'monolithBrick',
          'wireframe',
          'wood'
        ],
        HeatingType: [
          'autonomousGas',
          'centralCoal',
          'centralGas',
          'diesel',
          'electric',
          'fireplace',
          'no',
          'solidFuelBoiler',
          'stove'
        ]
      },
      Land: {
        Area: 0,
        AreaUnitType: ['hectare', 'sotka'],
        Status: [
          'farm',
          'gardening',
          'individualHousingConstruction',
          'industrialLand',
          'privateFarm',
          'suburbanNonProfitPartnership'
        ]
      },
      BargainTerms: {
        Price: 0,
        UtilitiesTerms: {
          IncludedInPrice: false,
          Price: 0,
          FlowMetersNotIncludedInPrice: false
        },
        Currency: ['eur', 'rur', 'usd'],
        BargainAllowed: false,
        BargainPrice: 0,
        BargainConditions: '',
        LeaseTermType: ['fewMonths','longTerm'],
        PrepayMonths: 0,
        Deposit: 0,
        ClientFee: 0,
        AgentFee: 0,
        AgentBonus: {
          Value: 0,
          PaymentType: ['fixed', 'percent'],
          Currency: ['eur', 'rur', 'usd'],
        }
      }
    },
    cottageRent: {
      Category: 'cottageRent',
      BedsCount: 0,
      BuildingCadastralNumber: '',
      SettlementName: '',
      TotalArea: 0,
      BedroomsCount: 0,
      WcLocationType: ['indoors','outdoors'],
      RepairType: ['cosmetic', 'design', 'euro', 'no'],
      HasInternet: false,
      HasFurniture: false,
      HasPhone: false,
      HasKitchenFurniture: false,
      HasTv: false,
      HasWasher: false,
      HasConditioner: false,
      HasBathtub: false,
      IsInHiddenBase: false,
      HasShower: false,
      HasBathhouse: false,
      HasGarage: false,
      HasPool: false,
      HasDishwasher: false,
      PetsAllowed: false,
      HasFridge:false,
      ChildrenAllowed:false,
      Building: {
        FloorsCount: 0,
        BuildYear: 0,
        MaterialType: [
          'aerocreteBlock',
          'boards',
          'brick',
          'foamConcreteBlock',
          'gasSilicateBlock',
          'monolith',
          'monolithBrick',
          'wireframe',
          'wood'
        ],
        HeatingType: [
          'autonomousGas',
          'centralCoal',
          'centralGas',
          'diesel',
          'electric',
          'fireplace',
          'no',
          'solidFuelBoiler',
          'stove'
        ]
      },
      Land: {
        Area: 0,
        AreaUnitType: ['hectare', 'sotka'],
        Status: [
          'farm',
          'gardening',
          'individualHousingConstruction',
          'industrialLand',
          'privateFarm',
          'suburbanNonProfitPartnership'
        ]
      },
      BargainTerms: {
        Price: 0,
        UtilitiesTerms: {
          IncludedInPrice: false,
          Price: 0,
          FlowMetersNotIncludedInPrice: false
        },
        Currency: ['eur', 'rur', 'usd'],
        BargainAllowed: false,
        BargainPrice: 0,
        BargainConditions: '',
        LeaseTermType: ['fewMonths','longTerm'],
        PrepayMonths: 0,
        Deposit: 0,
        ClientFee: 0,
        AgentFee: 0,
        AgentBonus: {
          Value: 0,
          PaymentType: ['fixed', 'percent'],
          Currency: ['eur', 'rur', 'usd'],
        }
      }
    },
    townhouseRent: {
      Category: 'townhouseRent',
      BedsCount: 0,
      BuildingCadastralNumber: '',
      SettlementName: '',
      TotalArea: 0,
      BedroomsCount: 0,
      WcLocationType: ['indoors', 'outdoors'],
      RepairType: ['cosmetic', 'design', 'euro', 'no'],
      HasInternet: false,
      HasFurniture: false,
      HasPhone: false,
      HasKitchenFurniture: false,
      HasTv: false,
      HasWasher: false,
      HasConditioner: false,
      HasBathtub: false,
      IsInHiddenBase: false,
      HasShower: false,
      HasBathhouse: false,
      HasGarage: false,
      HasPool: false,
      HasDishwasher: false,
      PetsAllowed: false,
      HasFridge:false,
      ChildrenAllowed:false,
      Building: {
        FloorsCount: 0,
        BuildYear: 0,
        MaterialType: [
          'aerocreteBlock',
          'boards',
          'brick',
          'foamConcreteBlock',
          'gasSilicateBlock',
          'monolith',
          'monolithBrick',
          'wireframe',
          'wood'
        ],
        HeatingType: [
          'autonomousGas',
          'centralCoal',
          'centralGas',
          'diesel',
          'electric',
          'fireplace',
          'no',
          'solidFuelBoiler',
          'stove'
        ]
      },
      Land: {
        Area: 0,
        AreaUnitType: ['hectare', 'sotka'],
        Status: [
          'farm',
          'gardening',
          'individualHousingConstruction',
          'industrialLand',
          'privateFarm',
          'suburbanNonProfitPartnership'
        ]
      },
      BargainTerms: {
        Price: 0,
        UtilitiesTerms: {
          IncludedInPrice: false,
          Price: 0,
          FlowMetersNotIncludedInPrice: false
        },
        Currency: ['eur', 'rur', 'usd'],
        BargainAllowed: false,
        BargainPrice: 0,
        BargainConditions: '',
        LeaseTermType: ['fewMonths','longTerm'],
        PrepayMonths: 0,
        Deposit: 0,
        ClientFee: 0,
        AgentFee: 0,
        AgentBonus: {
          Value: 0,
          PaymentType: ['fixed', 'percent'],
          Currency: ['eur', 'rur', 'usd'],
        }
      }
    },
    houseShareRent: {
      Category: 'houseShareRent',
      BedsCount: 0,
      BuildingCadastralNumber: '',
      SettlementName: '',
      TotalArea: 0,
      ShareAmount: '',
      BedroomsCount: 0,
      WcLocationType: ['indoors', 'outdoors'],
      RepairType: ['cosmetic', 'design', 'euro', 'no'],
      HasInternet: false,
      HasFurniture: false,
      HasPhone: false,
      HasKitchenFurniture: false,
      HasTv: false,
      HasWasher: false,
      HasConditioner: false,
      HasBathtub: false,
      IsInHiddenBase: false,
      HasShower: false,
      HasBathhouse: false,
      HasGarage: false,
      HasPool: false,
      HasDishwasher: false,
      PetsAllowed: false,
      HasFridge:false,
      ChildrenAllowed:false,
      Building: {
        FloorsCount: 0,
        BuildYear: 0,
        MaterialType: [
          'aerocreteBlock',
          'boards',
          'brick',
          'foamConcreteBlock',
          'gasSilicateBlock',
          'monolith',
          'monolithBrick',
          'wireframe',
          'wood'
        ],
        HeatingType: [
          'autonomousGas',
          'centralCoal',
          'centralGas',
          'diesel',
          'electric',
          'fireplace',
          'no',
          'solidFuelBoiler',
          'stove'
        ]
      },
      Land: {
        Area: 0,
        AreaUnitType: ['hectare', 'sotka'],
        Status: [
          'farm',
          'gardening',
          'individualHousingConstruction',
          'industrialLand',
          'privateFarm',
          'suburbanNonProfitPartnership'
        ]
      },
      BargainTerms: {
        Price: 0,
        UtilitiesTerms: {
          IncludedInPrice: false,
          Price: 0,
          FlowMetersNotIncludedInPrice: false
        },
        Currency: ['eur', 'rur', 'usd'],
        BargainAllowed: false,
        BargainPrice: 0,
        BargainConditions: '',
        LeaseTermType: ['fewMonths','longTerm'],
        PrepayMonths: 0,
        Deposit: 0,
        ClientFee: 0,
        AgentFee: 0,
        AgentBonus: {
          Value: 0,
          PaymentType: ['fixed', 'percent'],
          Currency: ['eur', 'rur', 'usd'],
        }
      }
    },
    garageRent: {
      Category: 'garageRent',
      Garage: {
        Type: ['box','garage','parkingPlace'],
        GarageType: ['builtIn','capital','samostroy','shell'],
        Material: ['brick','metal'],
        Status: ['byProxy','cooperative','ownership ']
      },
      TotalArea: 0,
      HasLight: false,
      HasElectricity: false,
      HasHeating: false,
      HasWater: false,
      HasExtinguishingSystem: false,
      IsInHiddenBase: false,
      Building: {
        Name: '',
        Parking: {
          Type: [
            'ground',
            'multilevel',
            'open',
            'roof',
            'underground'
          ],
        },
        Infrastructure: {
          HasCarWash: false,
          HasCarService: false,
          HasTire: false,
          HasInspectionPit: false,
          HasVideoSurveillance: false,
          HasHourSecurity: false,
          HasAutomaticGates: false,
          HasEntryByPass: false,
          HasBasement: false
        }
      },
      BargainTerms: {
        Price: 0,
        PriceType: ['all','hectare','sotka','squareMeter'],
        Currency: ['eur', 'rur', 'usd'],
        PaymentPeriod: ['annual','monthly'],
        LeaseType: ['direct','sublease'],
        IncludedOptions: [
          {
            IncludedOptionsEnum: ['operationalCosts','utilityCharges']
          }
        ],
        LeaseTermType: ['fewMonths','longTerm'],
        MinLeaseTerm: 0,
        PrepayMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
        ClientFee: 0,
        SecurityDeposit: 0,
        AgentBonus: {
          Value: 0,
          PaymentType: ['fixed', 'percent'],
          Currency: ['eur', 'rur', 'usd'],
        }
      }
    },
    buildingRent: {
      Category: 'buildingRent',
      ConditionType: [
        'cosmeticRepairsRequired',
        'design',
        'finishing',
        'majorRepairsRequired',
        'typical'
      ],
      Layout: [
        'cabinet',
        'corridorplan',
        'mixed',
        'openSpace'
      ],
      HasFurniture: false,
      InputType: [
        'commonFromStreet',
        'commonFromYard',
        'separateFromStreet',
        'separateFromYard'
      ],
      AvailableFrom: '',
      TaxNumber: 0,
      IsInHiddenBase: false,
      Building: {
        Name: '',
        FloorsCount: 0,
        TotalArea: 0,
        HeatingType: ['autonomous','central','no'],
        CeilingHeight: 0,
        Parking: {
          Type: [
            'ground',
            'multilevel',
            'open',
            'roof',
            'underground'
          ],
          PlacesCount: 0,
          PriceMonthly: 0,
          IsFree: false
        },
        Type: [
          'administrativeBuilding',
          'businessCenter',
          'businessCenter2',
          'businessHouse',
          'businessPark',
          'businessQuarter',
          'businessQuarter2',
          'free',
          'industrialComplex',
          'industrialPark',
          'industrialSite',
          'industrialWarehouseComplex',
          'logisticsCenter',
          'logisticsComplex',
          'logisticsPark',
          'mansion',
          'manufactureBuilding',
          'manufacturingFacility',
          'modular',
          'multifunctionalComplex',
          'officeAndHotelComplex',
          'officeAndResidentialComplex',
          'officeAndWarehouse',
          'officeAndWarehouseComplex',
          'officeBuilding',
          'officeCenter',
          'officeComplex',
          'officeIndustrialComplex',
          'officeQuarter',
          'old',
          'other',
          'outlet',
          'propertyComplex',
          'residentialComplex',
          'residentialHouse',
          'shoppingAndBusinessComplex',
          'shoppingAndCommunityCenter',
          'shoppingAndEntertainmentCenter',
          'shoppingAndWarehouseComplex',
          'shoppingCenter',
          'shoppingComplex',
          'specializedShoppingCenter',
          'standaloneBuilding',
          'technopark',
          'tradeAndExhibitionComplex',
          'tradingHouse',
          'tradingOfficeComplex',
          'warehouse',
          'warehouseComplex'
        ],
        HouseLineType: ['first','other','second'],
        ClassType: ['a','aPlus','b','bMinus','bPlus','c'],
        Developer: '',
        ManagementCompany: '',
        VentilationType: ['central','local','no'],
        ExtinguishingSystemType: [
          'alarm',
          'gas',
          'hydrant',
          'no',
          'powder',
          'sprinkler',
        ],
        ExtinguishingSystemTypes: [
          {
            ExtinguishingSystemTypeEnum: [
              'alarm',
              'gas',
              'hydrant',
              'no',
              'powder',
              'sprinkler'
            ]
          }
        ],
        LiftTypes: [
          {
            LiftTypeSchema: {
              Type: [
                'cargo',
                'escalator',
                'lift',
                'passenger',
                'telpher',
                'travelator'
              ],
              AdditionalType: '',
              Count: 0
            }
          }
        ],
        StatusType: ['operational','project','underConstruction'],
      },
      Land: {
        Area: 0,
        AreaUnitType: ['hectare','sotka'],
        Type: ['owned','rent ']
      },
      BargainTerms:{
        Price: 0,
        PriceType: ['all','hectare','sotka','squareMeter'],
        Currency: ['eur', 'rur', 'usd'],
        PaymentPeriod: ['annual','monthly'],
        VatType: ['included','notIncluded','usn'],
        LeaseType: ['direct','sublease'],
        IncludedOptions: [
          {
            IncludedOptionsEnum: ['operationalCosts','utilityCharges']
          }
        ],
        LeaseTermType: ['fewMonths','longTerm'],
        MinLeaseTerm: 0,
        PrepayMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
        HasGracePeriod: false,
        Deposit: 0,
        ClientFee: 0,
        SecurityDeposit: 0,
        AgentFee: 0,
        AgentBonus: {
          Value: 0,
          PaymentType: ['fixed', 'percent'],
          Currency: ['eur', 'rur', 'usd'],
        }
      }
    },
    commercialLandRent: {
      Category: 'commercialLandRent',
      Layout: [
        'cabinet',
        'corridorplan',
        'mixed',
        'openSpace'
      ],
      AvailableFrom: '',
      TaxNumber: 0,
      IsInHiddenBase: false,
      Land: {
        Area: 0,
        AreaUnitType: ['hectare','sotka'],
        Status: [
          'forAgriculturalPurposes',
          'industryTransportCommunications',
          'settlements'
        ],
        PossibleToChangeStatus: false
      },
      PermittedUseType: [
        'agricultural',
        'businessManagement',
        'commonUseArea',
        'highriseBuildings',
        'hotelAmenities',
        'individualHousingConstruction',
        'industry',
        'leisure',
        'lowriseHousing',
        'publicUseOfCapitalConstruction',
        'serviceVehicles',
        'shoppingCenters',
        'warehouses'
      ],
      PossibleToChangePermitedUseType: false,
      HasEncumbrances: false,
      Electricity: {
        LocationType: ['border','location','no'],
        PossibleToConnect: false,
        Power: 0
      },
      Gas:{
        LocationType: ['border','location','no'],
        PossibleToConnect: false,
        Capacity: 0,
        PressureType: ['high','low','middle']
      },
      Drainage:{
        LocationType: ['border','location','no'],
        PossibleToConnect: false,
        Capacity: 0,
        Type: ['autonomous','central']
      },
      Water:{
        LocationType: ['border','location','no'],
        PossibleToConnect: false,
        Capacity: 0,
        Type: ['autonomous','central','pumpingStation','waterIntakeFacility','waterTower']
      },
      DrivewayType: ['asphalt','ground','no '],
      BargainTerms:{
        Price: 0,
        PriceType: ['all','hectare','sotka','squareMeter'],
        Currency: ['eur', 'rur', 'usd'],
        PaymentPeriod: ['annual','monthly'],
        VatType: ['included','notIncluded','usn'],
        LeaseType: ['direct','sublease'],
        IncludedOptions: [
          {
            IncludedOptionsEnum: ['operationalCosts','utilityCharges']
          }
        ],
        LeaseTermType: ['fewMonths','longTerm'],
        MinLeaseTerm: 0,
        PrepayMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
        HasGracePeriod: false,
        ClientFee: 0,
        SecurityDeposit: 0,
        AgentFee: 0,
        AgentBonus: {
          Value: 0,
          PaymentType: ['fixed', 'percent'],
          Currency: ['eur', 'rur', 'usd'],
        }
      }
    },
    officeRent: {
      Category: 'officeRent',
      TotalArea: 0,
      MinArea: 0,
      FloorNumber: 0,
      ConditionType: [
        'cosmeticRepairsRequired',
        'finishing',
        'majorRepairsRequired',
        'office'
      ],
      IsOccupied: false,
      Layout: [
        'cabinet',
        'corridorplan',
        'mixed',
        'openSpace'
      ],
      FurniturePresence: ['no','yes'],
      AvailableFrom: '',
      IsLegalAddressProvided: false,
      WaterPipesCount: 0,
      TaxNumber: 0,
      IsInHiddenBase: false,
      BusinessShoppingCenter: {
        id: 0
      },
      Building: {
        Name: '',
        FloorsCount: 0,
        BuildYear: 0,
        MaterialType: [
          'aerocreteBlock',
          'block',
          'boards',
          'brick',
          'foamConcreteBlock',
          'gasSilicateBlock',
          'monolith',
          'monolithBrick',
          'old',
          'panel',
          'stalin',
          'wireframe',
          'wood'
        ],
        TotalArea: 0,
        HeatingType: ['autonomous','central','no'],
        CeilingHeight: 0,
        Parking: {
          Type: [
            'ground',
            'multilevel',
            'open',
            'roof',
            'underground'
          ],
          PlacesCount: 0,
          PriceMonthly: 0,
          Currency: ['eur','rur','usd'],
          IsFree: false,
        },
        Type: [
          'administrativeBuilding',
          'businessCenter',
          'businessCenter2',
          'businessHouse',
          'businessPark',
          'businessQuarter',
          'businessQuarter2',
          'free',
          'industrialComplex',
          'industrialPark',
          'industrialSite',
          'industrialWarehouseComplex',
          'logisticsCenter',
          'logisticsComplex',
          'logisticsPark',
          'mansion',
          'manufactureBuilding',
          'manufacturingFacility',
          'modular',
          'multifunctionalComplex',
          'officeAndHotelComplex',
          'officeAndResidentialComplex',
          'officeAndWarehouse',
          'officeAndWarehouseComplex',
          'officeBuilding',
          'officeCenter',
          'officeComplex',
          'officeIndustrialComplex',
          'officeQuarter',
          'old',
          'other',
          'outlet',
          'propertyComplex',
          'residentialComplex',
          'residentialHouse',
          'shoppingAndBusinessComplex',
          'shoppingAndCommunityCenter',
          'shoppingAndEntertainmentCenter',
          'shoppingAndWarehouseComplex',
          'shoppingCenter',
          'shoppingComplex',
          'specializedShoppingCenter',
          'standaloneBuilding',
          'technopark',
          'tradeAndExhibitionComplex',
          'tradingHouse',
          'tradingOfficeComplex',
          'warehouse',
          'warehouseComplex'
        ],
        ClassType: ['a','aPlus','b','bMinus','bPlus','c'],
        Developer: '',
        ManagementCompany:  '',
        VentilationType: ['forced','natural','no'],
        ConditioningType: ['central','local','no'],
        ExtinguishingSystemType:  [
          'alarm',
          'gas',
          'hydrant',
          'no',
          'powder',
          'sprinkler'
        ],
        ExtinguishingSystemTypes: [
          {
            ExtinguishingSystemTypeEnum: [
              'alarm',
              'gas',
              'hydrant',
              'no',
              'powder',
              'sprinkler'
            ]
          }
        ],
        StatusType: ['operational','project','underConstruction'],
        AccessType: ['free','passSystem'],
        Infrastructure : {
          HasCarWash: false,
          HasBuffet: false,
          HasCarService: false,
          HasCanteen: false,
          HasCentralReception: false,
          HasHotel: false,
          HasAtm: false,
          HasExhibitionAndWarehouseComplex: false,
          HasPharmacy: false,
          HasBankDepartment: false,
          HasCinema: false,
          HasCafe: false,
          HasMedicalCenter: false,
          HasBeautyShop: false,
          HasStudio: false,
          HasNotaryOffice: false,
          HasPool: false,
          HasClothesStudio: false,
          HasWarehouse: false,
          HasPark: false,
          HasRestaurant: false,
          HasFitnessCentre: false,
          HasSupermarket: false,
          HasMinimarket: false,
          HasShoppingArea: false,
          HasConferenceRoom: false
        }
      },
      Land: {
        Area: 0,
        AreaUnitType: ['hectare','sotka'],
        Type: ['owned','rent ']
      },

    }

  }

  const Cian_fid = sequelize.define("cian_fid", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ExternalId: {
      type: Sequelize.STRING(64),
      unique: 'compositeIndex'
    },
    PropertyType: {
      type: Sequelize.STRING(16),
      references: {
        // ссылка на другую модель
        model: propertyType,
        // название колонки модели-ссылки с первичным ключом
        key: 'value',
      }

    },
    Description: {
      type: Sequelize.STRING
    },
    GuestsCount: {
      type: Sequelize.INTEGER
    },
    Address: {
      type: Sequelize.STRING
    },
    Coordinates: {
      type: Sequelize.GEOMETRY('POINT')
    },
    CadastralNumber: {
      type: Sequelize.STRING(32)
    },
    Phones: {
      type: Sequelize.JSON
      /*
        [
          {
            PhoneSchema: {
              CountryCode: 	Код страны (String)
              Number:	      Номер (String)
            }
          }
        ]
      */
    },
    Highway: {
      type: Sequelize.JSON
    },
    Highways: {
      type: Sequelize.JSON
    }

  });
  return Cian_fid;
};
