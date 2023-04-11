import React, { useRef, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import Option from "./option";
import axios from "axios";
import { useQuery } from "react-query";
import { motion, AnimatePresence } from "framer-motion";
import "./style.scss";

function useSearchQuery(search: string) {
  return useQuery<any[], Error>(
    ["searchQuery", search],
    () => axios.get(`/search/options/${search}`).then((res) => res.data),
    { enabled: !!search }
  );
}

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const AutoCompleteInput: React.FC<Props> = ({ ...rest }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce<string>(search, 200);
  const { data: options, isLoading } = useSearchQuery(debouncedSearch);

  const [isFocused, setFocus] = useState(false);
  const wrapperRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const { current } = wrapperRef;
      if (current && !current.contains(e.target)) {
        setFocus(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearch(query);
    setFocus(false);
    navigate(`/app/search/${query}`);
  };

  return (
    <div ref={wrapperRef} className="auto-input-container">
      <div className="input-wrap">
        <SearchIcon className="search-icon" />
        <input
          {...rest}
          placeholder="Search songs, artists etc..."
          value={search}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(search)}
          onFocus={() => setFocus(true)}
          onInput={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      <AnimatePresence>
        {isFocused && (
          <motion.div
            className="autoCompeleteList"
            onClick={(e) => e.preventDefault()}
            animate={{
              opacity: 1,
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <ul className="list">
              {!isLoading &&
                options?.map((x, i) => (
                  <Option query={x} key={i} handleSearch={handleSearch} />
                ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutoCompleteInput;
