const OLD_WHITE = 0xFAEBD7
const TEXTURE_WIDTH = 32
const TEXTURE_HEIGHT = 32
const WIDTH = TEXTURE_WIDTH*4//window.innerWidth*0.8 - window.innerWidth*0.8%TEXTURE_WIDTH
const HEIGHT = TEXTURE_HEIGHT*4// window.innerHeight*0.8 - window.innerHeight*0.8%TEXTURE_HEIGHT
const MATRIX_WIDTH = (WIDTH / TEXTURE_WIDTH)
const MATRIX_HEIGHT = (HEIGHT / TEXTURE_HEIGHT)

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
const BARREL_2_SCALE = 0.2
const BARREL_3_SCALE = 0.2
const BARREL_4_SCALE = 0.2
const BARREL_LARGE_SCALE = 0.2
const BARREL_SMALL_SCALE = 0.2
const BARROW_SCALE = 0.2
const BATHTUB_SCALE = 0.2
const BENCH_1_SCALE = 0.2
const BENCH_2_SCALE = 0.2
const BENCH_TABLE_1_SCALE = 0.2
const BENCH_TABLE_2_SCALE = 0.2
const BENCH_TABLE_3_SCALE = 0.2
const BOOK_1_SCALE = 0.2
const BOOK_2_SCALE = 0.2
const BOOK_3_SCALE = 0.2
const BOOK_4_SCALE = 0.2
const BOOK_5_SCALE = 0.2
const BOOK_6_SCALE = 0.2
const BOOK_7_SCALE = 0.2
const BOOK_8_SCALE = 0.2
const BOOK_LEANING_1_SCALE = 0.2
const BOOK_LEANING_2_SCALE = 0.2
const BOOK_LEANING_3_SCALE = 0.2
const BOOK_LEANING_4_SCALE = 0.2
const BOOK_LEANING_5_SCALE = 0.2
const BOOK_LEANING_6_SCALE = 0.2
const BOOKS_SCALE = 0.2
const BOOK_SHELF_SCALE = 0.2
const BOOK_SHELF_FULL_SCALE = 0.2
const BRAZIER_SCALE = 0.2
const BRAZIER_LIT_SCALE = 0.2
const BROOM_SCALE = 0.2
const BUCKET_SCALE = 0.2
const BUCKET_FULL_SCALE = 0.2
const CANDLESTICK_1_SCALE = 0.2
const CANDLESTICK_2_SCALE = 0.2
const CANDLESTICK_3_SCALE = 0.2
const CANDLESTICK_4_SCALE = 0.2
const CART_SCALE = 0.2
const CHAIR_1_SCALE = 0.2
const CHAIR_2_SCALE = 0.2
const CHAIR_3_SCALE = 0.2
const CHAIR_4_SCALE = 0.2
const CHAIR_5_SCALE = 0.2
const CHAIR_6_SCALE = 0.2
const CHEST_SCALE = 0.2
const CLOTHES_PEG_SCALE = 0.2
const CRATE_1_SCALE = 0.2
const CRATE_2_SCALE = 0.2
const CRATE_3_SCALE = 0.2
const CRATE_4_SCALE = 0.2
const CRATE_5_SCALE = 0.2
const CRATE_6_SCALE = 0.2
const CRATE_7_SCALE = 0.2
const CRATE_8_SCALE = 0.2
const CRATE_9_SCALE = 0.2
const CRATE_10_SCALE = 0.2
const CRATE_11_SCALE = 0.2
