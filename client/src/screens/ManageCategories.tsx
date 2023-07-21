import {MouseEventHandler, useState} from "react";
import {
    useCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation
} from "../gql/generated/schema";
import Card from "../components/Card";
import {useNavigate} from "react-router";
import ICategory from "../interfaces/ICategory";
import BadgeEdit from "../components/BadgeEdit";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

export default function AddManageCities() {
    //
    // STATES
    //
    const navigate = useNavigate();
    const [newCategory, setNewCategory] = useState({name: ""},)
    const [open, setOpen] = useState(false);
    const [categoryIdforModal, setCategoryIdForModal] = useState('')
    const [dataForUpdate, setDataForUpdate] = useState({name: ""},)

    //
    // MUTATIONS GRAPHQL
    //
    const [sendNewCategory] = useCreateCategoryMutation({
        // Après avoir effectué la mutation, appel à refetch pour réactualiser les catégories
        onCompleted: () => refetch()
    });
    const [deleteCategory] = useDeleteCategoryMutation({onCompleted: () => refetch()})
    const [updateCategory] = useUpdateCategoryMutation({onCompleted: () => refetch()})
    const {data, refetch} = useCategoriesQuery();

    const categories = data?.categories ?? [];

    //
    // FONCTIONS ONCLICK
    //

    // Au click du bouton, on lance la fonction sendNewCategory for utilisé la mutation gql et créer une nouvelle catégorie
    const onClickSendCategory = () => {
        sendNewCategory({variables: {data: newCategory}});
    };

    const onClickDeleteCategory: MouseEventHandler<HTMLButtonElement> = (event) => {
        const categoryId = event.currentTarget.getAttribute("data-id");
        if (categoryId) {
            deleteCategory({variables: {deleteCategoryId: parseInt(categoryId)}});
        }
    };

    // Au click navigation à la page précédente
    const goBack = () => {
        navigate(-1);
    }

    const handleClickOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
        const catchedCategoryId = event.currentTarget.getAttribute("data-id");
        if (catchedCategoryId) {
            setCategoryIdForModal(catchedCategoryId)
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateCategory = () => {
        updateCategory({
            variables: {
                updateCategoryId: parseInt(categoryIdforModal),
                updateCategoryData: dataForUpdate
            }
        });
        setCategoryIdForModal('')
        setOpen(false);
    }

    return (
        <Card>
            <div className={"addCityContainer"}>
                <button className={"backButton"} onClick={goBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                        <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"/>
                    </svg>
                </button>
                <h2 className={"title"}>Ajouter une catégorie</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Nom de la catégorie"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({name: e.target.value})}
                    />
                    <button
                        onClick={onClickSendCategory}
                        className={"tertiaryButton"}>
                        Ajouter
                    </button>
                </div>
            </div>

            <div className={"manageCitiesContainer"}>
                <h2 className={"title"}>Gérer les catégories</h2>
                <div className="categories_badges_container">
                    {categories.map((category: ICategory, index: number) => {
                        return (
                            <BadgeEdit contentA={category.name} key={index} functionOnClick={onClickDeleteCategory}
                                       functionOnClick2={handleClickOpen}
                                       categoryId={category.id}
                            />
                        );
                    })}
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier la catégorie</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer un nouveau nom
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Nom"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setDataForUpdate({name: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleUpdateCategory}>Envoyer</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
