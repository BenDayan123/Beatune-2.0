#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// use window_vibrancy::apply_blur;
#[macro_use]
extern crate lazy_static;
use discord_rich_presence::{activity, DiscordIpc, DiscordIpcClient};
use serde::{Deserialize, Serialize};
use std::error::Error;
use std::sync::Mutex;
use tauri::{CustomMenuItem, Event, Manager, SystemTray, SystemTrayMenu, Window};
use tauri_plugin_autostart::MacosLauncher;
use window_shadows::set_shadow;

lazy_static! {
    static ref SONG: Mutex<Song> = Mutex::new(Song {
        name: String::new(),
        image: String::new(),
        artist: String::new(),
    });
}

fn make_tray() -> SystemTray {
    let menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("toggle".to_string(), "Hide"))
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"));
    SystemTray::new().with_menu(menu)
}

#[derive(Serialize, Deserialize)]
pub struct Song {
    name: String,
    image: String,
    artist: String,
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec![]),
        ))
        .system_tray(make_tray())
        .setup(|app| {
            let window: Window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            tauri::async_runtime::spawn(async move {
                discord_rpc_update().expect("");
            });

            app.listen_global("song-change", move |e: Event| {
                let mut lock = SONG.lock().unwrap();
                let payload = e.payload().unwrap();
                let song = serde_json::from_str(payload);
                match song {
                    Ok(s) => {
                        *lock = s;
                    }
                    Err(err) => {
                        println!("{}", err);
                    }
                }
                std::mem::drop(lock);
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn discord_rpc_update() -> Result<(), Box<dyn Error>> {
    let mut client = DiscordIpcClient::new("1048693413471596554")?;
    loop {
        if client.connect().is_ok() {
            break;
        }
    }
    loop {
        let state = SONG.lock().unwrap();
        let payload = activity::Activity::new()
            .state(&*state.artist)
            .details(&*state.name)
            .assets(
                activity::Assets::new()
                    .large_image(&*state.image)
                    .large_text("Beatune 2.0")
                    .small_image("logo"),
            );
        if client.set_activity(payload).is_err() && client.reconnect().is_ok() {
            continue;
        }
        std::mem::drop(state);
        std::thread::sleep(std::time::Duration::from_secs(2));
    }

    #[allow(unreachable_code)]
    Ok(())
}
