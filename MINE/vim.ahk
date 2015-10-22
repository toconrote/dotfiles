#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
#InstallKeybdHook
#HotkeyInterval 200

;; Muhenkan -> Esc
sc07B::Escape

;; Henkan -> BS
vk1Csc079::Backspace

;; Ctrl+Space -> Enter
^Space::Send, {Enter}

;; Katakana/Hiragana -> Backspace
sc070::Delete

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
