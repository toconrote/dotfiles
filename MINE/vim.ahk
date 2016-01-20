#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
#InstallKeybdHook
#HotkeyInterval 200

;this script is useful when CapsLock key is asigned LCtrl

;; (chrome)Katakana/Hiragana -> Next
#IfWinActive ahk_class Chrome_WidgetWin_1
sc070::!Right
#IfWinActive
#IfWinNotActive ahk_class XLMAIN
;; Muhenkan -> Esc
sc07B::Escape
^sc07B::Send, {Escape}
#IfWinNotActive

;; Henkan -> BS
vk1Csc079::Backspace

;; Katakana/Hiragana -> Delete
sc070::Delete

;; Ctrl+Space -> Enter
^Space::Send, {Enter}

;; Ctrl+';' ->Enter
^vkBBsc027::Send, {Enter}

;; Ctrl+hjkl
^h::Send, {Left}
^j::Send, {Down}
^k::Send, {Up}
^l::Send, {Right}

;; Ctrl+Shift+hjkl
^+h::Send, +{Left}
^+j::Send, +{Down}
^+k::Send, +{Up}
^+l::Send, +{Right}

;; Ctrl+i -> IME ON/OFF
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

~MButton & RButton::Send, #e
