import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { PUBLIC_UPLOAD_PATH } from '../constants/global';

export async function upload(module_name, obj) {
    try {
        const buffer = Buffer.from(await obj.arrayBuffer());
        const filename = module_name +'-'+ `${uuid()}-${obj.name}`;
        const filepath = path.resolve(PUBLIC_UPLOAD_PATH, filename);
    
        await writeFile(filepath, buffer);
        return filename;
    } catch (error) {
        return false;
    }
}

export async function remove(filename) {
    if(filename) {
        try {
            const unlink_filepath = path.resolve(PUBLIC_UPLOAD_PATH, filename);
            await unlink(unlink_filepath);
        } catch (error) {
            
        }
    }
    return true;
}

