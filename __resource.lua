ui_page('ui/index.html')

files({
    'ui/index.html',
    'ui/script.js',
    'ui/style.css',
})

client_script 'client.lua'

exports {
    'CreateMenu',
    'CloseMenu',
}
