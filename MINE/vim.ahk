;; Muhenkan -> Esc
sc07B::Escape

;; Henkan -> BS
vk1Csc079::Backspace

;; Katakana/Hiragana -> Backspace
sc070::Delete

;; Ctrl+hjkl
^h::Send, {Left}
^j::Send, {Down}
^k::Send, {Up}
^l::Send, {Right}

;; Ctrl+i -> IME ON/OFF
^i::Send, {vkF3sc029}

#HotkeyInterval 200
#InstallKeybdHook