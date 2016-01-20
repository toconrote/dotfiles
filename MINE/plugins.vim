"""""""""""""""""""""""""プラギン"""""""""""""""""""""""""""""""""""""""
""NeoBundle""
if has('vim_starting')
   " 初回起動時のみruntimepathにneobundleのパスを指定する"
   set runtimepath+=$home/vimfiles/bundle/neobundle.vim/
endif

" NeoBundleを初期化"
call neobundle#begin(expand('$home/vimfiles/bundle/'))

" インストールするプラグインをここに記述"
NeoBundle 'Shougo/unite.vim'
NeoBundle 'vim-scripts/taglist.vim'
NeoBundle 'vim-scripts/TagHighlight'
NeoBundle 'Shougo/neomru.vim'
NeoBundle 'scrooloose/nerdtree'
NeoBundle 'Lokaltog/vim-easymotion'
NeoBundle 'kana/vim-submode'
NeoBundle 'kana/vim-smartinput'
NeoBundle 'tomtom/tcomment_vim'
NeoBundle 'nathanaelkane/vim-indent-guides'
NeoBundle 'tpope/vim-surround'
NeoBundle 'Shougo/neocomplcache'
NeoBundle 'thinca/vim-quickrun'
NeoBundle 'Shougo/vimproc.vim'

call neobundle#end()

" ファイルタイプ別のプラグイン/インデントを有効にする"
filetype plugin indent on


"""""""""""""""""""""""""プラグインのキーマップ"""""""""""""""""""""""""
""""""nerdtree
nnoremap <silent><C-e> :NERDTreeToggle<CR>

""""""unite
" ファイルは tabdrop で開く
"call unite#custom#default_action('file' , 'vsplitswitch')
"
"""""" The prefix key.
nnoremap    [unite]   <Nop>
nmap    <Space>u [unite]

""let g:unite_source_history_yank_enable =1
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

nnoremap <silent> [unite]< :<C-u>Unite<Space>file<Space>-default-action=left<CR> 
nnoremap <silent> [unite]> :<C-u>Unite<Space>file<Space>-default-action=right<CR> 
"""""" vinarise
let g:vinarise_enable_auto_detect = 1 
"""""" unite-build map
nnoremap <silent> ,vb :Unite build<CR>
nnoremap <silent> ,vcb :Unite build:!<CR>
nnoremap <silent> ,vch :UniteBuildClearHighlight<CR>

let g:unite_source_grep_command = 'ag'
let g:unite_source_grep_default_opts = '--nocolor --nogroup'
let g:unite_source_grep_max_candidates = 200
let g:unite_source_grep_recursive_opt = ''
"""""" unite-grepの便利キーマップ
vnoremap /g y:Unite grep::-iRn:<C-R>=escape(@", '\\.*$^[]')<CR><CR>

"""""" easy-motion
""基本のft置き換え
map f <Plug>(easymotion-fl)
map t <Plug>(easymotion-tl)
map F <Plug>(easymotion-Fl)
map T <Plug>(easymotion-Tl)

""２文字find
nmap s <Plug>(easymotion-s2)
xmap s <Plug>(easymotion-s2)
omap s <Plug>(easymotion-s2)

"""""" submode
""ウィンドウサイズ変更
call submode#enter_with('renmove', 'n', '', '<Space>w>', '<C-w>>')
call submode#enter_with('renmove', 'n', '', '<Space>w<', '<C-w><')
call submode#map('renmove', 'n', '', '>', '<C-w>>')
call submode#map('renmove', 'n', '', '<', '<C-w><')

"""""" indent-guide
" vimを立ち上げたときに、自動的にvim-indent-guidesをオンにする
let g:indent_guides_enable_on_vim_startup = 1

""""""" restart
" 終了時に保存するセッションオプションを設定する
let g:restart_sessionoptions
  \ = 'blank,buffers,curdir,folds,help,localoptions,tabpages'

""""""" neocomplecache
" プラグイン有効化
let g:neocomplcache_enable_at_startup = 1

""""""" quickrun
let g:quickrun_config = {
\   "_" : {
\       "outputter/buffer/split" : ":botright 8sp",
\       "outputter/buffer/close_on_empty" : 1,
\       "runner" : "vimproc",
\       "runner/vimproc/updatetime" : 60
\   },
\}

""""""" vimproc
