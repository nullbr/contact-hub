import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ContactParams } from "../../types/contacts";
import {
  setDeleteModal,
  setEditModal,
  setSelected,
} from "../../features/table/tableSlice";
import DeleteButton from "../Shared/Buttons/DeleteButton";
import EditButton from "../Shared/Buttons/EditButton";

const Contact = ({ contact }: { contact: ContactParams }) => {
  const { selected } = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch() as any;

  return (
    <tr className="hover:bg-gray-100">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-${contact.id}`}
            aria-describedby={`checkbox-${contact.id}`}
            type="checkbox"
            checked={selected.includes(contact.id)}
            onChange={() => dispatch(setSelected(contact.id))}
            className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 cursor-pointer hover:scale-105"
          />
          <label htmlFor={`checkbox-${contact.id}`} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="p-2 mr-12 space-x-6 whitespace-nowrap text-sm font-semibold text-gray-900 capitalize">
        {contact.name}
      </td>
      <td className="p-2 text-sm text-gray-900 whitespace-nowrap">
        {contact.phone_number}
      </td>
      <td className="p-2 text-sm text-gray-900 whitespace-nowrap">
        {contact.cpf}
      </td>
      <td className="p-2 text-sm text-gray-900 whitespace-nowrap max-w-[10rem] truncate capitalize">
        {contact.location.city},{" "}
        <span className="upcase">{contact.location.state}</span>
      </td>
      <td className="p-2 space-x-2 whitespace-nowrap">
        <EditButton
          actionFn={() =>
            dispatch(setEditModal({ resource: "contact", state: contact.id }))
          }
        />

        <DeleteButton actionFn={() => dispatch(setDeleteModal(contact.id))} />
      </td>
    </tr>
  );
};
export default Contact;
