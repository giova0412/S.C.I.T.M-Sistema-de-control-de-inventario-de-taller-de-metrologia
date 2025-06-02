import ReportesDAO from "../dao/reportes.dao.js";
import { createRequire } from 'module';
import { join } from 'path';
import { existsSync } from 'fs';
const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit-table');
import { Readable } from "stream" ;

const ReportesController = {};

ReportesController.insert = (req, res) => {
    ReportesDAO.insert(req.body)
        .then((response) => {
            res.json({
                data: {
                    message: "reporte  insertado correctamente",
                    reporte: response
                }
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error
                }
            });
        });
};

ReportesController.getAll = (req, res) => {
    ReportesDAO.getAll()
        .then((reportes) => {
            res.json({
                data: {
                    reportes: reportes
                }
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error
                }
            });
        });
};

ReportesController.getOne = (req, res) => {
    ReportesDAO.getOne(req.params.ficha_trabajador)
        .then((reporte) => {
            res.json({
                data: {
                    reporte: reporte
                }
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error
                }
            });
        });
};

ReportesController.updateOne = (req, res) => {
    ReportesDAO.updateOne(req.body, req.params.ficha_trabajador)
        .then((result) => {
            res.json({
                data: {
                    message: "reporte  actualizado",
                    result: result
                }
            });
        })
        .catch((error) => {
            res.json({
                data: { error: error }
            });
        });
};

ReportesController.deleteOne = (req, res) => {
    ReportesDAO.deleteOne(req.params.ficha_trabajador)
        .then((reportesDelete) => {
            res.json({
                data: {
                    message: "reporte  eliminado correctamente",
                    reportes_delete: reportesDelete
                }
            });
        })
        .catch((error) => {
            res.json({
                data: { error: error }
            });
        });
};

ReportesController.downloadPDF = async (req, res) => {
    try {  
        const reportes = await ReportesDAO.getAll();
        const doc = new PDFDocument({ margin: 30, size: 'A4' });
        
        // Pipe the PDF directly to the response
        doc.pipe(res);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reportes.pdf');

        // Espacio para logo
        doc.rect(30, 30, 150, 80).stroke();
        doc.fontSize(10).text('Logo de la empresa', 65, 60);

        // Título
        doc.fontSize(20).text('Reporte de Herramientas', 250, 55, { align: 'center' });
        
        // Fecha de generación
        doc.fontSize(10).text(`Fecha: ${new Date().toLocaleDateString()}`, 450, 40);

        // Tabla
        const table = {
            title: "Lista de Herramientas Prestadas",
            headers: [
                "Ficha",
                "Nombre",
                "Herramienta",
                "ID",
                "F. Recibido",
                "F. Entrega"
            ],
            rows: reportes.map(reporte => [
                reporte.ficha_trabajador,
                reporte.nombre,
                reporte.nombre_herramienta || '',
                reporte.id_herramienta,
                new Date(reporte.fecha_recibido).toLocaleDateString(),
                new Date(reporte.fecha_entrega).toLocaleDateString()
            ])
        };

        // Posicionar la tabla después del logo
        await doc.table(table, {
            x: 30,
            y: 130,
            width: 535,
            divider: {
                header: { disabled: false, width: 2, opacity: 1 },
                horizontal: { disabled: false, width: 1, opacity: 0.5 }
            },
            padding: 5,
            columnSpacing: 5,
            prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
            prepareRow: () => doc.font('Helvetica').fontSize(10)
        });

        // Espacio para firma
        const currentY = doc.y + 30;
        doc.fontSize(12).text('Firma del Encargado:', 30, currentY);
        doc.rect(30, currentY + 20, 200, 60).stroke();
        doc.fontSize(10).text('Nombre y Firma', 100, currentY + 85);

        doc.end();
    } catch (error) {
        console.error('Error al generar PDF:', error);
        res.status(500).json({ 
            success: false,
            message: "Error al generar PDF",
            error: error.message 
        });
    }
};

ReportesController.downloadOnePDF = async (req, res) => {
    try {
        const reporte = await ReportesDAO.getOne(req.params.ficha_trabajador);
        if (!reporte) {
            return res.status(404).json({ 
                success: false,
                message: "Reporte no encontrado" 
            });
        }

        const doc = new PDFDocument({ margin: 30, size: 'A4' });
        
        // Pipe the PDF directly to the response
        doc.pipe(res);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=reporte_${reporte.ficha_trabajador}.pdf`);

        // Logo (opcional)
        const logoPath = join(process.cwd(), 'uploads', 'image.png');
        if (existsSync(logoPath)) {
            doc.image(logoPath, 30, 30, { width: 150, height: 80, fit: [150, 80] });
        } else {
            // Si no hay logo, dibuja un rectángulo
            doc.rect(30, 30, 150, 80).stroke();
            doc.fontSize(10).text('Logo de la empresa', 65, 60);
        }

        // Título
        doc.fontSize(20).text('Reporte Individual de Herramienta', 250, 55, { align: 'center' });
        
        // Fecha de generación
        doc.fontSize(10).text(`Fecha: ${new Date().toLocaleDateString()}`, 450, 40);

        // Tabla de datos
        const table = {
            title: "Detalles de la Herramienta",
            headers: ["Campo", "Valor"],
            rows: [
                ["Ficha Trabajador", reporte.ficha_trabajador],
                ["Nombre", reporte.nombre],
                ["Herramienta", reporte.nombre_herramienta || ''],
                ["ID Herramienta", reporte.id_herramienta],
                ["Fecha Recibido", new Date(reporte.fecha_recibido).toLocaleDateString()],
                ["Fecha Entrega", new Date(reporte.fecha_entrega).toLocaleDateString()]
            ]
        };

        // Posicionar la tabla después del logo
        await doc.table(table, {
            x: 30,
            y: 130,
            width: 535,
            divider: {
                header: { disabled: false, width: 2, opacity: 1 },
                horizontal: { disabled: false, width: 1, opacity: 0.5 }
            },
            padding: 5,
            prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
            prepareRow: () => doc.font('Helvetica').fontSize(10)
        });

        // Espacio para firma
        const currentY = doc.y + 30;
        doc.fontSize(12).text('Firma del Encargado:', 30, currentY);
        doc.rect(30, currentY + 20, 200, 60).stroke();
        doc.fontSize(10).text('Nombre y Firma', 100, currentY + 85);

        doc.end();
    } catch (error) {
        console.error('Error al generar PDF individual:', error);
        res.status(500).json({ 
            success: false,
            message: "Error al generar PDF",
            error: error.message 
        });
    }
};

export default ReportesController;