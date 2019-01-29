"""""""""""""""""""""""""プラギン"""""""""""""""""""""""""""""""""""""""
""NeoBundle""
if has('vim_starting')
  " 初回起動時のみruntimepathにneobundleのパスを指定する"
  set runtimepath+=$home/vimfiles/bundle/neobundle.vim/
endif

" NeoBundleを初期化"
call neobundle#begin(expand('$home/vimfiles/bundle/'))

" インストールするプラグインをここに記述"
" unite
NeoBundle 'Shougo/unite.vim'
" taglistを表示
NeoBundle 'vim-scripts/taglist.vim'
" ctagsの情報からハイライト
NeoBundle 'vim-scripts/TagHighlight'
" uniteにmruを追加
NeoBundle 'Shougo/neomru.vim'
" Ctrl+Eでエクスプローラ
NeoBundle 'scrooloose/nerdtree'
" カーソル移動
NeoBundle 'Lokaltog/vim-easymotion'
" サブモード定義を可能にする
NeoBundle 'kana/vim-submode'
" 閉じ括弧を自動挿入
NeoBundle 'kana/vim-smartinput'
" コメントアウト
NeoBundle 'tomtom/tcomment_vim'
" インデントに色をつけて階層がわかりやすくなる
NeoBundle 'nathanaelkane/vim-indent-guides'
" テキストオブジェクト拡張
NeoBundle 'tpope/vim-surround'
" コード補完
NeoBundle 'Shougo/neocomplcache'
" html入力補助
NeoBundle 'mattn/emmet-vim'
" URLをブラウザで開く
NeoBundle 'open-browser.vim'
" vimからwebapiを叩く
NeoBundle 'mattn/webapi-vim'
" css3用シンタックス
NeoBundle 'hail2u/vim-css3-syntax'
" html5用シンタックス
NeoBundle 'taichouchou2/html5.vim'
" js用２種
"NeoBundle 'pangloss/vim-javascript'
NeoBundle 'jlebensold/reilly_restaurants'
NeoBundle 'jiangmiao/simple-javascript-indenter'
" quickrun.vim
NeoBundle 'thinca/vim-quickrun'
" haskell対応tag生成
NeoBundle 'elaforge/fast-tags'

call neobundle#end()

" ファイルタイプ別のプラグイン/インデントを有効にする"
filetype plugin indent on


"""""""""""""""""""""""""プラグインのキーマップ"""""""""""""""""""""""""
""""""nerdtree
nnoremap <silent><C-e> :NERDTreeToggle<CR>

""""""unite
" ファイルは tabdrop で開く
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

""""""" neocomplecache
" プラグイン有効化
let g:neocomplcache_enable_at_startup = 1

""""""" emmet-vim
let g:user_emmet_mode = 'iv'
let g:user_emmet_leader_key = '<C-Y>'
let g:use_emmet_complete_tag = 1
let g:user_emmet_settings = {
      \ 'lang' : 'ja',
      \ 'html' : {
      \   'filters' : 'html',
      \   'self-closing-tag' : 'xhtml',
      \   'indentation' : '  ',
      \ },
      \ 'css' : {
      \   'filters' : 'fc',
      \   'snippets': {'cmt1' : '/******** | ********/',},
      \ },
      \ 'php' : {
      \   'extends' : 'html',
      \   'filters' : 'html',
      \ },
      \}
augroup EmmitVim
  autocmd!
  autocmd FileType * let g:user_emmet_settings.indentation = '               '[:&tabstop]
augroup END

""""""" open-browser.vim
let g:netrw_nogx = 1 " disable netrw's gx mapping.
nmap gx <Plug>(openbrowser-smart-search)
vmap gx <Plug>(openbrowser-smart-search)

""""""" quickrun.vim
let b:quickrun_config = {'outputter/buffer/split' : "botright 8sp"}
nnoremap <silent> \ :QuickRun<CR>
" <C-c> で実行を強制終了させる
" quickrun.vim が実行していない場合には <C-c> を呼び出す
nnoremap <expr><silent> <C-c> quickrun#is_running() ? quickrun#sweep_sessions() : "\<C-c>"

""""""" fast-tags
au BufWritePost *.hs            silent !init-tags %
au BufWritePost *.hsc           silent !init-tags %
