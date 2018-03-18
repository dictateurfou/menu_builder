--By dictateurfou
-- Global function use with : exports.menu_builder:CreateMenu(tab)

Keys = {
    ["ESC"] = 322, ["F1"] = 288, ["F2"] = 289, ["F3"] = 170, ["F5"] = 166, ["F6"] = 167, ["F7"] = 168, ["F8"] = 169, ["F9"] = 56, ["F10"] = 57, 
    ["~"] = 243, ["1"] = 157, ["2"] = 158, ["3"] = 160, ["4"] = 164, ["5"] = 165, ["6"] = 159, ["7"] = 161, ["8"] = 162, ["9"] = 163, ["-"] = 84, ["="] = 83, ["BACKSPACE"] = 177, 
    ["TAB"] = 37, ["Q"] = 44, ["W"] = 32, ["E"] = 38, ["R"] = 45, ["T"] = 245, ["Y"] = 246, ["U"] = 303, ["P"] = 199, ["["] = 39, ["]"] = 40, ["ENTER"] = 18,
    ["CAPS"] = 137, ["A"] = 34, ["S"] = 8, ["D"] = 9, ["F"] = 23, ["G"] = 47, ["H"] = 74, ["K"] = 311, ["L"] = 182,
    ["LEFTSHIFT"] = 21, ["Z"] = 20, ["X"] = 73, ["C"] = 26, ["V"] = 0, ["B"] = 29, ["N"] = 249, ["M"] = 244, [","] = 82, ["."] = 81,
    ["LEFTCTRL"] = 36, ["LEFTALT"] = 19, ["SPACE"] = 22, ["RIGHTCTRL"] = 70, 
    ["HOME"] = 213, ["PAGEUP"] = 10, ["PAGEDOWN"] = 11, ["DELETE"] = 178,
    ["LEFT"] = 174, ["RIGHT"] = 175, ["TOP"] = 27, ["DOWN"] = 173,
    ["NENTER"] = 201, ["N4"] = 108, ["N5"] = 60, ["N6"] = 107, ["N+"] = 96, ["N-"] = 97, ["N7"] = 117, ["N8"] = 61, ["N9"] = 118
}

tableau = {"Véhicule",{["li"] = "defaut", ["h2"] = "defaut", ["ul"] = "defaut"},
                    {["name"] = "Limousine",["type"] = "client", ["action"] = "president:getCar", ["arg"] = {["vehicle"] = "stretch"}},
                    {["name"] = "4x4",["type"] = "client", ["action"] = "president:getCar", ["arg"] = {["vehicle"] = "granger"}}
                }

open = false

RegisterNUICallback('client', function(data)
    TriggerEvent(data.action, data.arg)
end)

RegisterNUICallback('server', function(data)
    TriggerServerEvent(data.action, data.arg)
end)


RegisterNUICallback('close', function(data)
    open = false
end)

function sendnotif(message)
    SetNotificationTextEntry("STRING")
    AddTextComponentString(message)
    DrawNotification(0,1)   
end

function CreateMenu(tab)
    open = true
	SendNUIMessage({
		create = tab
	})
end

function CreateNewMenu(tab)
    open = true
    SendNUIMessage({
        createNew = tab
    })
end

function CloseMenu()
	SendNUIMessage({
		close = true
	})
end

function TopMenu()
	SendNUIMessage({
		top = true
	})
end

function DownMenu()
	SendNUIMessage({
		down = true
	})
end

function EnterMenu()
	SendNUIMessage({
		enter = true
	})
end


Citizen.CreateThread(function()

    while true do

        Citizen.Wait(0)
        if IsControlJustPressed(1,Keys["E"]) then
            --CreateMenu(tableau)
        elseif IsControlJustPressed(1,Keys["ESC"]) then
        	CloseMenu()
        elseif IsControlJustPressed(1,Keys["BACKSPACE"]) then
        	CloseMenu()
        elseif IsControlJustPressed(1,Keys["DOWN"]) then
        	if open == true then
        		DownMenu()
                sendnotif('test down')
        	end
        elseif IsControlJustPressed(1,Keys["TOP"]) then
        	if open == true then
        		TopMenu()
        	end

        elseif IsControlJustPressed(1,Keys["ENTER"]) then
        	if open == true then
        		EnterMenu()
        	end
        else
            
        end
    end
end)


