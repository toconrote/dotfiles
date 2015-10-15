source $VIMRUNTIME/vimrc_example.vim
""source $VIMRUNTIME/mswin.vim
""behave mswin
set directory=C:/Temp/vim_swap
set backupdir=C:/Temp/vim_backup
command! Rvimrc source C:/Program Files/Vim/_vimrc
command! Rgvimrc source C:/Program Files/Vim/_gvimrc
runtime! userautoload/*.vim

""colorscheme candystripe
colorscheme jellybeans

set fileencoding=utf-8
set fileencodings=utf-8,shift-JIS

set number

set nocompatible
""set tabstop=2
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
set mouse=a

"""""""""""""""""""""""""""""キーマッピング"""""""""""""""""""""""""""""
"●インサートモード"
"■カーソル移動"
inoremap <C-l> nop
inoremap <C-j> <Down>
inoremap <C-k> <Up>
inoremap <C-h> <Left>
inoremap <C-l> <Right>

"■BS
inoremap <C-p> nop
inoremap <C-p> <BS>

"■jjでEsc"
inoremap <silent> jj <Esc>:set iminsert=0<CR>

"■Esc時imeオフ"
inoremap <silent> <ESC> <ESC>:set iminsert=0<CR>

"■Ctrl+移動で５ずつ移動"
nnoremap <C-h> 5h
nnoremap <C-j> 5j
nnoremap <C-k> 5k
nnoremap <C-l> 5l

"Ctrl+WをSpace,Wに
nnoremap <Space>w <C-w>

"Ctrl+Oで半角全角"
inoremap <C-i> nop
inoremap <C-i> <C-^>

"""""""""""""""""""""""""""""php"""""""""""""""""""""""""""""""""""""""
let php_sql_query = 1
let php_baselib = 1
let php_hemlInStrings = 1
let php_noShortTags = 1
let php_parent_error_close = 1

let g:sql_type_default='mysql'

"""""""""""""""""""""""""プラギン"""""""""""""""""""""""""""""""""""""""
""NeoBundle""
if has('vim_starting')
   " 初回起動時のみruntimepathにneobundleのパスを指定する"
   set runtimepath+=C:/Users/mk0260/Documents/.vim/bundle/neobundle.vim/
endif

" NeoBundleを初期化"
call neobundle#begin(expand('C:/Users/mk0260/Documents/.vim/bundle/'))

" インストールするプラグインをここに記述"
NeoBundle 'Shougo/unite.vim'
NeoBundle 'teramako/jscomplete-vim'
NeoBundle 'vim-scripts/taglist.vim'
NeoBundle 'vim-scripts/TagHighlight'
NeoBundle 'Shougo/neomru.vim'
NeoBundle 'scrooloose/nerdtree'

call neobundle#end()

" ファイルタイプ別のプラグイン/インデントを有効にする"
filetype plugin indent on

""unite""
" ファイルは tabdrop で開く
call unite#custom#default_action('file' , 'tabopen')

"""""""""""""""""""""""""プラグインのキーマップ"""""""""""""""""""""""""
"nerdtree
nnoremap <silent><C-e> :NERDTreeToggle<CR>

" The prefix key.
nnoremap    [unite]   <Nop>
nmap    <Space>u [unite]

" unite.vim keymap
let g:unite_source_history_yank_enable =1
nnoremap <silent> [unite]u :<C-u>Unite<Space>file<CR>
nnoremap <silent> [unite]g :<C-u>Unite<Space>grep<CR>
nnoremap <silent> [unite]f :<C-u>Unite<Space>buffer<CR>
nnoremap <silent> [unite]b :<C-u>Unite<Space>bookmark<CR>
nnoremap <silent> [unite]a :<C-u>UniteBookmarkAdd<CR>
nnoremap <silent> [unite]m :<C-u>Unite<Space>file_mru<CR>
nnoremap <silent> [unite]h :<C-u>Unite<Space>history/yank<CR>
nnoremap <silent> [unite]r :<C-u>Unite -buffer-name=register register<CR>
nnoremap <silent> [unite]c :<C-u>UniteWithBufferDir -buffer-name=files file<CR>
nnoremap <silent> ,vr :UniteResume<CR>
" vinarise
let g:vinarise_enable_auto_detect = 1 
" unite-build map
nnoremap <silent> ,vb :Unite build<CR>
nnoremap <silent> ,vcb :Unite build:!<CR>
nnoremap <silent> ,vch :UniteBuildClearHighlight<CR>

let g:unite_source_grep_command = 'ag'
let g:unite_source_grep_default_opts = '--nocolor --nogroup'
let g:unite_source_grep_max_candidates = 200
let g:unite_source_grep_recursive_opt = ''
" unite-grepの便利キーマップ
vnoremap /g y:Unite grep::-iRn:<C-R>=escape(@", '\\.*$^[]')<CR><CR>
