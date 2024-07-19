package com.cardapio.backend.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class UtilFunctions {
     public static String saveImage(MultipartFile image, String path) {
        try {
            // gera um nome único
            String uniqueFilename = UUID.randomUUID().toString();

            // salva a extensão do arquivo
            String imageExtension = getFileExtension(image.getOriginalFilename());

            String filename = uniqueFilename + "." + imageExtension;

            Path directory = Paths.get(path, filename); // caminho que vai salvar
            Files.write(directory, image.getBytes()); // salva no caminho especificado
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar a imagem", e);
        }
    }

    public static String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        } else {
            return "";
        }
    }

    public static void fileExistsDelete(String imageUrl, String path) {
        File directory = new File(path);
        File[] files = directory.listFiles();

        if (files != null) {
            for (File file : files) {
                if (file.isFile() && file.getName().equalsIgnoreCase(imageUrl)) {
                    file.delete();
                    break;
                }
            }
        }
    }
}
