import { Router } from "express";
const router = Router();
import notesRoutes from "./notes";
import youtubeRoutes from "./youtube";

router.use("/notes", notesRoutes);
router.use("/youtube", youtubeRoutes);

export default router;
