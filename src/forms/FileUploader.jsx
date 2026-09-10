import React, { useRef, useState, useImperativeHandle } from 'react';
import LucideUpload from '~icons/lucide/upload';
import Papa from "papaparse";
import axios from "axios";
import Table from '../tables/Table';
const FileUploader = ({ref, value, field, accept, ...props}) => {
    console.log(props);
    const inputRef = useRef(null);
    const tableRef = useRef(null);
    const [preview, setPreview] = useState(false);

    const reset = () => {
        tableRef.current.reset();
        setPreview(false);
    }

    useImperativeHandle(ref, () => ({
        reset,
    }));

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        field.handleChange(file);
        Papa.parse(file, {
          header: true,  
          skipEmptyLines: true,   
          dynamicTyping: true, 
          complete: (results) => {
            tableRef.current.editData(results.data, props.public_id);
            setPreview(true);
          },
          error: (err) => {
            console.error("Error al parsear CSV:", err);
          }
        });
    };
    return (
        <>
        <div style={{display: !preview ? 'block' : 'none'}}>
            <div className="dropzone">
                <div className="dropzone-icon">
                    <LucideUpload />
                </div>
                <p className="dropzone-title">Arrastra archivos aquí o da click para seleccionarlos</p>
            </div>
            <input
                style={{display: 'none'}} 
                ref={inputRef}
                onChange={(e) => handleFileChange(e)}
                type="file"
                accept='.csv'
                {...props}
            />
        </div>
        <div style={{display: preview ? 'block' : 'none'}}>
            <Table ref={tableRef} {...props.preview_table} />
        </div>
        </>
    )
}

export default FileUploader;