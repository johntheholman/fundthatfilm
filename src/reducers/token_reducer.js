const DEFAULT_STATE = {
    shareableList: [
    {
        'north america': {
            'theatrical': {
                'gross': 0,
                'film rental': 0,
                'distribution fee': 0,
                'direct distribution expenses': 0,
                'distributors net': 0
            },
            'home entertainment': {
                'gross': 0,
                'expenses': 0,
                'distribution fee': 0,
                'distributors net': 0
            },
            'theatrical and home': {
                'sales agent fee': 0,
                'distributors net': 0
            },
            'pay per view': {
                'gross': 0,
                'distribution fee': 0,
                'direct distribution expenses': 0,
                'sales agent fee': 0,
                'distributors net': 0
            },
            'premium cable': {
                'gross': 0,
                'distribution fee': 0,
                'direct distribution expenses': 0,
                'sales agent fee': 0,
                'distributors net': 0
            },
            'free tv premiere': {
                'gross': 0,
                'distribution fee': 0,
                'direct distribution expenses': 0,
                'sales agent fee': 0,
                'distributors net': 0
            },
            'cable and syndicated tv': {
                'gross': 0,
                'distribution fee': 0,
                'direct distribution expenses': 0,
                'sales agent fee': 0,
                'distributors net': 0
            },
            'total net earnings': 0
        },
        'international': {
            'theatrical, home, tv gross': 0,
            'sales agent fee': 0,
            'total net earnings': 0
        },
        'global consumer products': {
            'royalties gross': 0,
            'merchandising distribution fee': 0,
            'sales agent fee': 0,
            'distributors net': 0
        },
        'total distributors net': 0,
        'global brand tie-in fees': 0,
        'production financing expense': 0,
        'negative cost': 0,
        'studio burden': 0,
        'talent residuals': 0,
        'sales agent direct sales expenses': 0,
        'producers gross': 0,
        'talent participation': 0,
        'producers net': 0,
        'studios share': 0,
        'producers share': 0,
        'distributors net earning to cost ratio': '0:0',
        'expenses after distributors net': 0
    }
]
};

const tokenReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case 'SEND_TOKEN':
      return {shareableList: action.payload.data.data}
    default:
      return state;
  }
}

export default tokenReducer;