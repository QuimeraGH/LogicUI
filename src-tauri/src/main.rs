use std::fs::{File, create_dir_all};
use std::path::Path;
use std::io::prelude::*;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ load_file, save_file ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn load_file(path: String) -> Result<String, String> {
    let path = Path::new(&path);
    let mut file = File::open(&path).map_err(|e| e.to_string())?;
    let mut contents = String::new();
    file.read_to_string(&mut contents).map_err(|e| e.to_string())?;
    Ok(contents)
}

#[tauri::command]
async fn save_file(path: String, content: String) -> Result<(), String> {
    let path = Path::new(&path);

    if let Some(parent) = path.parent() {
        create_dir_all(parent).map_err(|e| e.to_string())?;
    }

    let mut file = File::create(&path).map_err(|e| e.to_string())?;
    file.write_all(content.as_bytes()).map_err(|e| e.to_string())?;
    Ok(())
}
