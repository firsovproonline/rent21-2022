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
