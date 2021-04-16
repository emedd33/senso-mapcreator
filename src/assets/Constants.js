const OLD_WHITE = 0xFAEBD7
const TEXTURE_WIDTH = 32
const TEXTURE_HEIGHT = 32
const X_SCALE = 1
const Y_SCALE = 1
const WIDTH = window.innerWidth*0.9 -  window.innerWidth*0.9 % TEXTURE_WIDTH  
const HEIGHT = window.innerHeight*0.9 -  window.innerHeight*0.9 % TEXTURE_WIDTH  
const MATRIX_WIDTH = (WIDTH / TEXTURE_WIDTH) * 1 / X_SCALE
const MATRIX_HEIGHT = (HEIGHT / TEXTURE_HEIGHT) * 1 / Y_SCALE

// Tiles numbers
const NO_TILE = 0
const BOTTOMRIGHT = 1
const BOTTOM = 2
const BOTTOMLEFT = 3
const RIGHT = 4
const CENTER = 5
const LEFT = 6
const TOPRIGHT = 7
const TOP = 8
const TOPLEFT = 9
const SWING_UP_RIGHT = 10
const SWING_RIGHT_DOWN = 11
const SWING_RIGHT_UP = 12
const SWING_DOWN_RIGHT = 13
const U_FROM_LEFT = 14
const U_FROM_TOP = 15
const U_FROM_RIGHT = 16
const U_FROM_BOTTOM = 17
const CIRCLE = 18
const SWING_UP_RIGHT_BOTTOMRIGHT = 19
const SWING_RIGHT_DOWN_BOTTOMLEFT = 20
const SWING_RIGHT_UP_TOPLEFT = 21
const SWING_DOWN_RIGHT_TOPRIGHT = 22
const LEFT_RIGHT = 23
const TOP_BOTTOM = 24
const LEFT_TOPRIGHT = 25
const LEFT_BOTTOMRIGHT = 26
const TOP_BOTTOMLEFT = 27
const TOP_BOTTOMRIGHT = 28
const RIGHT_TOPLEFT = 29
const RIGHT_BOTTOMLEFT = 30
const BOTTOM_TOPRIGHT = 31
const BOTTOM_TOPLEFT = 32
const LEFT_TOPRIGHT_BOTTOMRIGHT = 33
const TOP_BOTTOMLEFT_BOTTOMRIGHT = 34
const RIGHT_BOTTOMLEFT_TOPLEFT = 35
const BOTTOM_TOPLEFT_TOPRIGHT = 36
const TOPLEFT_TOPRIGHT = 37
const TOPLEFT_BOTTOMLEFT = 38
const BOTTOMLEFT_BOTTOMRIGHT = 39
const TOPRIGHT_BOTTOMRIGHT = 40
const TOPLEFT_TOPRIGHT_BOTTOMRIGHT = 41
const TOPLEFT_TOPRIGHT_BOTTOMLEFT = 42
const TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT = 43
const TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT = 44
const TOPRIGHT_BOTTOMLEFT = 45
const TOPLEFT_BOTTOMRIGHT = 46
const TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT = 47

// Object scales 
const BARREL_1_SCALE = 0.2
const TABLE_1_SCALE = 0.15