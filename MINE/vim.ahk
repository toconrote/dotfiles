#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
#InstallKeybdHook
#InstallMouseHook
#HotkeyInterval 200
#Include indivisual.ahk

;this script is useful when CapsLock key is asigned LCtrl
;CtrlがCapsLockの位置にだったりとかそういう押しやすい位置の時に便利なスクリプト

;; (chrome)カタカナ／ひらがな -> 進む
#IfWinActive ahk_class Chrome_WidgetWin_1
sc070::!Right
#IfWinActive

;; エクセル
#IfWinActive ahk_class XLMAIN
;; 無変換 or ホイールクリック -> (セル内改行)Alt + Enter
sc07B::Send, !{Enter}
^sc07B::Send, !{Enter}
MButton::Send, !{Enter}
;; 変換 or カタカナ/ひらがな -> 前のシート、次のシート(Ctrl+PageUpDown)
^vk1Csc079::PgUp
^sc070::PgDn
;; Ctrl+Q -> F2
^q::Send, {F2}
#IfWinActive
#IfWinNotActive ahk_class XLMAIN
;; 無変換 -> Esc
sc07B::Escape
^sc07B::Send, {Escape}
#IfWinNotActive

;; 変換 -> バックスペース
vk1Csc079::Backspace
;; カタカナ/ひらがな -> Del
sc070::Delete

#IfWinNotActive ahk_class Vim
;; Ctrl + 変換 -> Home
^vk1Csc079::Home
;; Ctrl + カタカナ/ひらがな -> End
^sc070::End
#IfWinNotActive

;; Ctrl+Space -> Enter
;; ^Space::Send, {Enter}

;; Ctrl+';' ->Enter
^vkBBsc027::Send, {Enter}

;; Ctrl+hjkl
^h::Send, {Left}
^j::Send, {Down}
^k::Send, {Up}
^l::Send, {Right}

;; Ctrl+HJKL
^+h::Send, +{Left}
^+j::Send, +{Down}
^+k::Send, +{Up}
^+l::Send, +{Right}

;; Ctrl+i -> 半角全角
^i::Send, {vkF3sc029}

;; Ctrl+2 -> F2
^2::Send, {F2}

;; Ctrl+p -> %
^p::Send, `%

;; Ctrl+@ -> \
^@::Send, \

;; LCtrl+<> -> Alt+(Shift)Tab
LCtrl & <::ShiftAltTab
LCtrl & >::AltTab
