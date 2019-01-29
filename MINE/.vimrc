set background=dark
colorscheme hybrid

set fileencoding=utf-8
set fileencodings=utf-8,shift-JIS

set number
set nocompatible
set expandtab
set ambiwidth=double
set shiftwidth=2
set smartindent
set hidden
set history=50
set virtualedit=block
set whichwrap=b,s,[,],<,>
set nowrap
set autoindent
set scrolloff=16
set sidescrolloff=16
set list
set listchars=tab:^/
set laststatus=2
set statusline=%<%f\ %m\ %r%h%w%{'['.(&fenc!=''?&fenc:&enc).']['.&ff.']'}%=\ (%v,%l)/%L%8P\ 
set iminsert=0
set imsearch=-1
set ignorecase
set smartcase
set hlsearch
syntax on
set cursorline

"""""""""""""""""""""""""""""キーマッピング"""""""""""""""""""""""""""""
""""""●インサートモード"
"■カーソル移動"
noremap! <C-l> nop
noremap! <C-j> <Down>
noremap! <C-k> <Up>
noremap! <C-h> <Left>
noremap! <C-l> <Right>

"■BS
inoremap <C-p> nop
inoremap <C-p> <BS>
inoremap <S-BS> <Home>
inoremap <S-DEL> <END>

""""""●ノーマルモード
inoremap <C-i> <C-^>
"■Ctrl+移動で５ずつ移動(AHKでCtrl+hjklをカーソルに割り当ててある)"
nnoremap <Left> 5h
nnoremap <Down> 5j
nnoremap <Up> 5k
nnoremap <Right> 5l

"Ctrl+WをSpace,Wに
nnoremap <Space>w <C-w>

"UTF8で開きなおす"
nnoremap <silent> <F8> :set encoding=UTF-8<CR>

"Space+p,Pでクリップボードペースト"
nnoremap <Space>p "*p
nnoremap <Space>P "*P

"Escで検索ハイライト解除
nnoremap <silent> <Esc> :noh<CR>
